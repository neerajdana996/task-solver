import { Tag } from "@prisma/client";
import { useState } from "react";

export default function TagsSelector({ tags }: { tags: Tag[] }) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    return (
        <div className="p-8 flex gap-8">



            {tags.map((tag) => (
                <button
                    key={tag.id}
                    onClick={() => {
                        if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(a => a.id !== tag.id))
                        } else {
                            setSelectedTags([...selectedTags, tag])
                        }
                    }}
                >


                    <span

                        className={`"inline-flex items-center rounded-full  p-4 
                         text-md font-medium ${selectedTags.includes(tag) ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100"}`}>

                        {tag.name}
                    </span>
                </button>
            ))}

        </div >
    )
}
