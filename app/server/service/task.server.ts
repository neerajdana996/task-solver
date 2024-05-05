import { prisma } from "../db.server";
import { TagsService } from "./tags.server";

export class Taskservice {
    static getFilteredTasks(appliedFilters: {
        tagIds: number[];
        status: string[];
        author: never[];
    }) {

        const condition: {
            status?: any,
            tags?: any,
            userId?: any
        } = {}
        if (!appliedFilters.status?.includes("All")) {
            condition['status'] = {
                in: appliedFilters.status
            }
        }
        if (appliedFilters.tagIds.length) {
            condition['tags'] = {
                some: {
                    id: {
                        in: appliedFilters.tagIds
                    }
                }
            }
        }
        if (appliedFilters.author.length) {
            condition['userId'] = {
                in: appliedFilters.author
            }
        }
        return prisma.task.findMany({
            where: condition,
            select: {
                id: true,
                title: true,
                description: true,
                slug: true,
                tags: {
                    select: {
                        name: true
                    }
                },
                User: {
                    select: {
                        name: true,
                        image: true,
                        id: true,

                    }

                }
            }
        });

    }
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
        const slug = encodeURIComponent(title.toLowerCase().split(" ").join("-"));
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
        const slug = encodeURIComponent(title.toLowerCase().split(" ").join("-"));
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