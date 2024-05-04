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
                    password: user?.password || "",
                }
            }).then(() => false);
        }
        return userData?.onboarded;
    }
}