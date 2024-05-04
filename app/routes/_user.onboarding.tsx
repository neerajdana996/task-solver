



import { ActionFunction, ActionFunctionArgs, json, redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import TagsSelector from '~/components/task/TagsSelector';
import { prisma } from '~/server/db.server';
import { UserService } from '~/server/service/user.server';
import { logto } from '~/services/authentication';
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    const tags = await prisma.tag.findMany({})
    const userTags = await prisma.userTag.findMany({
        where: {
            userId: context?.userInfo?.sub as string
        },
        select: {
            tagId: true,
        }
    })
    return json({ tags, userTags });
}
export default function Onboarding() {
    const { tags, userTags } = useLoaderData<typeof loader>();

    return (
        <Form
            method="post"
            action="/onboarding"

        >
            <div className="border-b border-gray-200 pb-5">
                <div className="flex">
                    <div className="flex  flex-col ">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Select Topics</h3>
                        <p className="mt-2 max-w-4xl text-sm text-gray-500">
                            Select the topics you are interested in to get personalized content.
                            You can change these later in your settings.
                            You can select multiple topics.

                        </p>
                    </div>
                    <div className="flex-1">
                        <button type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium 
                        rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-gray-500 float-right">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <TagsSelector tags={tags} userTags={userTags} />
        </Form>
    )
}

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    const data = Object.fromEntries(await request.formData());
    const tagIds = data?.tags?.split(',').map((tagId: string) => parseInt(tagId))
    const response = await UserService.UpdateUserTags(context?.userInfo?.sub, tagIds);
    return redirect('/task');
}