

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
        <div className="flex flex-col border rounded-md p-4 w-full bg-white shadow-lg">
            <TaskDetailHeading task={task} />
            <div className='py-8 prose prose-lg'
                dangerouslySetInnerHTML={{ __html: task.description }
                } />
        </div>
    )
}
