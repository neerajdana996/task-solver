
export default function TagsViewer({
    tags
}: {
    tags: string[]
}) {
    return (
        <div className='flex flex-wrap gap-4'>
            {
                tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {tag}
                    </span>
                ))
            }
        </div>
    )
}