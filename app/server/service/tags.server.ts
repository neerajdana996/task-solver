import { prisma } from "../db.server";

export class TagsService {
    static async processTags(tagsstring: string) {
        const tags = tagsstring.split(",");
        const cleanedTagsName = tags.map((tag) => tag.trim());
        const cleanedTagsSlugs = cleanedTagsName.map((tag) => tag.toLowerCase().split(" ").join("-"));



        // we will now check in db if the tags exist
        const existingTags = await prisma.tag.findMany({
            where: {
                slug: {
                    in: cleanedTagsSlugs
                }
            },
            select: {
                name: true,
                id: true
            }
        })
        const existingTagsName = existingTags.map((tag) => tag.name);

        const newTags = cleanedTagsName.filter((tag) => !existingTagsName.includes(tag));
        const newTagsSlug = newTags.map((tag) => tag.toLowerCase().split(" ").join("-"));
        const newTagsData = newTags.map((tag, index) => {
            return {
                name: tag,
                slug: newTagsSlug[index]
            }
        });

        await prisma.tag.createMany({
            data: newTagsData,
            skipDuplicates: true,

        });

        const newSlugIds = await prisma.tag.findMany({
            where: {
                slug: {
                    in: newTagsSlug
                }
            }
        }).then((res) => res.map((tag) => tag.id));

        const existingSlugIds = existingTags.map((tag) => tag.id);

        return [...newSlugIds, ...existingSlugIds];

    }
}