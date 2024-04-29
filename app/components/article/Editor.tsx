

import Editor from "../modules/novel/ui/editor";
export default function App() {
    return (
        <div className="bg-white flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
            <input className="w-full max-w-screen-lg
            border-b border-gray-300 py-4 px-12 mb-4 border-0
            focus:ring-0 focus:border-current
            text-3xl

            "
                placeholder="Start With the Title"
            ></input>
            <Editor
                className="w-full min-h-[600px] prose prose-lg max-w-screen-lg"
            />

        </div>
    )
}