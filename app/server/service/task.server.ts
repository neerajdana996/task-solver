import { prisma } from "../db.server";
import { TagsService } from "./tags.server";

export class Taskservice {
    getTaskForEdit(id: string, userId: string) {
        return prisma.task.findFirst({
            where: {
                id: parseInt(id),
                userId: userId
            },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                tags: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }

    async getUniqueSlug(slug: string, id: number | undefined = undefined) {
        const condition = id ? { slug: slug, id: { not: id } } : { slug: slug };

        const existingSlug = await prisma.task.findFirst({
            where: condition,
            select: {
                slug: true
            }
        }).then((res) => {
            return res?.slug;
        });
        if (existingSlug) {
            return `${existingSlug}-${Math.random().toString(36).substring(7)}`;
        }
        return slug;
    }
    async addTask({
        title,
        description,
        userId,
        tags
    }: {
        title: string,
        description: string,
        userId: string,
        tags: string
    }) {
        const slug = title.toLowerCase().split(" ").join("-");
        const uniqueSlug = await this.getUniqueSlug(slug);
        const tagIds = await TagsService.processTags(tags);
        return prisma.task.create({
            data: {
                title,
                description,
                userId,
                slug: uniqueSlug,
                status: "InProgress",
                tags: {
                    connect: tagIds.map((id) => {
                        return {
                            id
                        }
                    })
                }
            },
        })

    }
    async updateTask({
        title,
        description,
        userId,
        id,
        tags
    }: {
        title: string,
        description: string,
        userId: string,
        id: string,
        tags: string
    }) {
        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (task?.userId !== userId) {
            throw new Error("Unauthorized");
        }
        const slug = title.toLowerCase().split(" ").join("-");
        const uniqueSlug = await this.getUniqueSlug(slug, parseInt(id));
        const tagIds = await TagsService.processTags(tags);
        return prisma.task.update({
            where: {
                id: parseInt(id),
                userId
            },
            data: {
                title,
                description,
                slug: uniqueSlug,
                status: "InProgress",
                tags: {
                    set: tagIds.map((id) => {
                        return {
                            id
                        }
                    })
                }
            }
        })

    }
    getTasks() {
        return prisma.task.deleteMany({});
    }
}