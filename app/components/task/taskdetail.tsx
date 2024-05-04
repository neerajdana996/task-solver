import { Task } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import TaskDetailHeading from "./taskDetailsHeading";

export default function TaskDetail({ task }: { task: Task }) {
    const navigation = useNavigate()

    const onClose = () => {
        navigation('/task')
    }
    return <div

        className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
        <div className="h-0 flex-1 overflow-y-auto">
            <input type="hidden" name="id" value={task?.id} />
            <input type="hidden" name="slug" value={task?.slug} />


            <div className="flex flex-1 flex-col p-8 gap-4 justify-between">
                <TaskDetailHeading task={task} />
                <div className=' '
                >
                    <div className='my-8 prose prose-lg mx-auto '
                        dangerouslySetInnerHTML={{ __html: task.description }
                        } />
                </div>

            </div>
        </div>
        <div className="flex flex-shrink-0 justify-end px-4 py-4">
            <button
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                type="submit"
                className="ml-4 inline-flex justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
                Save
            </button>
        </div>
    </div>
}
