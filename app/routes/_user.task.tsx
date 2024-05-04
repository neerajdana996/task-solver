
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { json, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import moment from 'moment';

import { Fragment } from 'react/jsx-runtime';
import TaskHeading from '~/components/task/taskHeading';
import { prisma } from '~/server/db.server';
import { Taskservice } from '~/server/service/task.server';
import { logto } from "~/services/authentication";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const status = [{
    label: "All",
    value: "All"
},
{
    label: "In Progress",
    value: "InProgress"
},
{
    label: "Completed",
    value: "Completed"
},
{
    label: "Not Started",
    value: "NotStarted"

}]
export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {



    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    const tags = await prisma.tag.findMany().then((tags) => tags.map((tag) => ({
        label: tag.name,
        value: tag.id
    })));
    const userTags = await prisma.userTag.findMany({
        where: {
            userId: context?.userInfo?.sub
        },
        select: {
            Tag: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })
    console.log(context);
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const paramsObject = Object.fromEntries(queryParams.entries());
    const appliedFilters = {
        tagIds: userTags.map((tag) => tag.Tag.id),
        status: ['InProgress'],
        author: []
    }
    if (paramsObject.taskTags) {
        appliedFilters.tagIds = paramsObject.taskTags.split(',').map((tagId) => parseInt(tagId));
    }
    if (paramsObject.taskStatus) {
        appliedFilters.status = paramsObject.taskStatus.split(',');
    }

    const tasks = await Taskservice.getFilteredTasks(appliedFilters)

    return json({ context, tasks, status, tags, userTags, appliedFilters });
}
const statuses: any = {
    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
    InProgress: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
export default function Userdashboard({ children }) {
    const { context, tasks } = useLoaderData();
    return (
        <> <TaskHeading />
            <div className="flex  py-2 space-x-2 
            ">

                <div className="flex flex-col  rounded-lg p-4 w-96 
              bg-gradient-to-r from-gray-50 to-gray-100
              h-full
            ">

                    <ul className="space-y-4 divide-y divide-gray-300 ">
                        {tasks.map((project) => (
                            <Link
                                to={`/task/detail/${project.slug}`}
                                key={project.id}
                                className="flex items-center justify-between gap-x-6 py-5">
                                <div className="min-w-0">
                                    <div className="flex items-start gap-x-3">
                                        <p className="text-sm font-semibold leading-6 capitalize text-gray-900">{project.title}</p>
                                        <p
                                            className={classNames(
                                                statuses[project.status],
                                                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                            )}
                                        >
                                            {project.status || 'InProgress'}
                                        </p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                        <p className="whitespace-nowrap">
                                            Posted On {moment(project.createdAt).format('MMM DD, YYYY')}
                                        </p>
                                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                            <circle cx={1} cy={1} r={1} />
                                        </svg>
                                        <p className="truncate">Created by {project.createdBy}</p>
                                    </div>
                                </div>
                                <div className="flex flex-none items-center gap-x-4">

                                    <Menu as="div" className="relative flex-none">
                                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">Open options</span>
                                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/task/edit/${project.slug}`}
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Edit<span className="sr-only">, {project.name}</span>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={'#'}
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Move<span className="sr-only">, {project.name}</span>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={'#'}
                                                            className={classNames(
                                                                active ? 'bg-gray-50' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            Delete<span className="sr-only">, {project.name}</span>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col flex-1">
                    <Outlet />
                </div>
            </div></>
    )
}
