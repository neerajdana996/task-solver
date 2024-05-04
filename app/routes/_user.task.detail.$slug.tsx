

import { json, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import TaskDetailHeading from '~/components/task/taskDetailsHeading';
import { prisma } from '~/server/db.server';
export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
    const slug = params.slug;
    const task = await prisma.task.findUnique({
        where: {
            slug: slug
        },
        select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            tags: {
                select: {
                    name: true
                }
            }
        }
    })
    return json({ slug, task });
}
export default function TaskDetails({ }) {
    const { slug, task } = useLoaderData<typeof loader>();
    return (
        <div className="flex flex-col  dark:bg-gray-900 rounded-md p-4 px-16 w-full bg-white  ">
            <TaskDetailHeading task={task} />
            <div className=' overflow-y-auto scrollbar-thin 
           
           scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100  overflow-y-scroll max-h-screen'
            >
                <div className='my-8 prose prose-lg mx-auto '
                    dangerouslySetInnerHTML={{ __html: task.description }
                    } />
            </div>
        </div>
    )
}
