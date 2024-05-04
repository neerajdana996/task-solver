

import { json, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import TaskPanel from '~/components/task/addTask/addPanel';
import TaskDetail from '~/components/task/taskdetail';
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
        <TaskPanel >
            <TaskDetail task={task} />
        </TaskPanel>
    )
}
