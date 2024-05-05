import { prisma } from "../db.server";

export class UserService {
    static async IsUserOnboarded(user: any) {

        const userData = await prisma.user.findUnique({
            where: {
                id: user?.sub
            },
            select: {
                onboarded: true
            }
        });
        if (!userData) {
            return prisma.user.create({
                data: {
                    id: user?.sub,
                    onboarded: false,
                    email: user?.email,
                    name: user?.name,
                    image: {
                        url: user?.picture
                    },
                    password: user?.password || "",
                }
            }).then(() => false);
        }
        return userData?.onboarded;
    }
    static async UpdateUserTags(userId: any, tags: number[]) {
        const userTags = await prisma.userTag.findMany({
            where: {
                userId
            }
        });
        const tagIds = userTags.map(userTag => userTag.tagId);
        const tagsToCreate = tags.filter(tag => !tagIds.includes(tag));
        const tagsToDelete = tagIds.filter(tag => !tags.includes(tag));
        await prisma.userTag.createMany({
            data: tagsToCreate.map(tagId => ({
                tagId,
                userId
            }))
        });
        await prisma.userTag.deleteMany({
            where: {
                userId,
                tagId: {
                    in: tagsToDelete
                }
            }
        });
        // update onboarded status
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                onboarded: true
            }
        });
        return true;
    }
}