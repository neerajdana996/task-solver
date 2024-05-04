import { Tag } from "@prisma/client";
import { useEffect, useState } from "react";

export default function TagsSelector({ tags, userTags }: { tags: any[], userTags: any[] }) {
    console.log(tags, userTags)
    const [selectedTags, setSelectedTags] = useState<Tag[]>();
    useEffect(() => {
        if (userTags?.length && tags?.length) {
            setSelectedTags(tags.filter(tag => userTags?.some(userTag => userTag.tagId === tag.id)))
        }



        return () => {

        }
    }, [userTags, tags])

    return (
        <div className="p-8 flex gap-8">
            <input type="hidden" name="tags" value={selectedTags?.map(tag => tag.id).join(",")} />


            {tags.map((tag) => (
                <button
                    key={tag.id}
                    type="button"
                    onClick={() => {
                        if (selectedTags?.includes(tag)) {
                            setSelectedTags(selectedTags.filter(a => a.id !== tag.id))
                        } else {
                            setSelectedTags([...selectedTags, tag])
                        }
                    }}
                >


                    <span

                        className={`"inline-flex items-center rounded-md  p-4 py-1.5
                         text-md font-medium ${selectedTags?.includes(tag) ? "text-gray-100 bg-gray-600" : "text-gray-600 bg-gray-100"}`}>

                        {tag.name}
                    </span>
                </button>
            ))}

        </div >
    )
}
