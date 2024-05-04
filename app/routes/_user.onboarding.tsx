



import { json, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import TagsSelector from '~/components/task/TagsSelector';
import { prisma } from '~/server/db.server';
export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {

    const tags = await prisma.tag.findMany({})
    return json({ tags });
}
export default function Onboarding() {
    const { tags } = useLoaderData<typeof loader>();
    return (
        <div>
            <div className="border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Select Topics</h3>
                <p className="mt-2 max-w-4xl text-sm text-gray-500 w-1/2">
                    Select the topics you are interested in to get personalized content.
                    You can change these later in your settings.
                    You can select multiple topics.

                </p>
            </div>
            <TagsSelector tags={tags} />
        </div>
    )
}
