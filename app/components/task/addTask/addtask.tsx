import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@remix-run/react";
export default function Addtask() {
    const navigation = useNavigate()
    const onClose = () => {
        navigation('/dashboard')
    }
    return <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
        <div className="h-0 flex-1 overflow-y-auto">
            <div className="bg-gray-700 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-base font-semibold leading-6 text-white">
                        Create a new task
                    </h1>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            className="relative rounded-md bg-gray-700 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={onClose}
                        >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>

            </div>
            <div className="flex flex-1 flex-col justify-between">
                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                    <div className="space-y-6 pb-5 pt-6">
                        <div>
                            <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Task Heading
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="project-name"
                                    id="project-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Task Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={25}
                                    className="block w-full rounded-md border-0 py-1.5
                                     text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>


                    </div>

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
    </form>
}
