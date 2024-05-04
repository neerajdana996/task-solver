import { useState } from 'react';

// {
//     label: "Tags",
//     type: "tags",
//     key: "tags",
//     size: "md",
//     value: jobPosting?.tags,
//   },
export default function ListBox({
    label,
    name,
    type = 'text',
    placeholder,
    ...props

}: {
    label: string,
    name: string,
    type?: string,
    placeholder?: string,
    [key: string]: any
}) {


    const [tags, setTags] = useState<string[]>([
        ...(props?.value || [])
    ])
    const [tag, setTag] = useState('')

    return (
        <div className="w-full">
            <div className='flex flex-col space-y-4'>
                <div className="w-full mt-2">
                    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                        {label}
                    </label>
                    <div className="mt-2">
                        <input type='hidden'
                            id={name}
                            name={name}
                            value={tags} />
                        <input
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            onKeyDown={(e) => {

                                if (e.key === 'Enter') {
                                    setTags([...tags, tag])
                                    setTag('')
                                }
                            }}
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                    </div>
                </div>
                <div className='flex flex-wrap gap-4'>
                    {
                        tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                {tag}
                                <button
                                    onClick={() => {
                                        tags.splice(index, 1)
                                        setTags([...tags])
                                    }}
                                    type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                                    <span className="sr-only">Remove</span>
                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                                        <path d="M4 4l6 6m0-6l-6 6" />
                                    </svg>
                                    <span className="absolute -inset-1" />
                                </button>
                            </span>
                            // <div
                            //     key={index}
                            //     className='border border-gray-600
                            //     flex items-center justify-between
                            //     rounded-md text-sm px-4 py-1 text-gray-700'
                            // >
                            //     <span> {tag}</span>
                            //     <button
                            //         type='button'

                            //         }
                            //         className='focus:outline-none bg-transparent ml-3'
                            //     >
                            //         <TrashIcon className='h-4 w-4' />
                            //     </button>

                            // </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
