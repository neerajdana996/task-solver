import { Link } from "@remix-run/react";
import TaskStatusFilter from "./filters/TaskStatusFilter";
import TaskTagsFilter from "./filters/TaskTagsFilter";

export default function TaskHeading() {
    return (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2 flex flex-col">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Task Based on your Intrests</h3>
                    <div className="flex space-x-4">
                        <TaskStatusFilter />
                        <TaskTagsFilter />
                    </div>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                    <Link
                        to="/task/create"
                        className="relative inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Post Task
                    </Link>
                </div>
            </div>
        </div>
    )
}
