import TaskPanel from "~/components/task/addTask/addPanel";
import Addtask from "~/components/task/addTask/addtask";


import { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, json, redirect } from '@remix-run/node';
export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
    const { id } = params;
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })
    const taskService = new Taskservice();
    const task = await taskService.getTaskForEdit(id, context?.userInfo?.sub as string);
    return json({ task });
}

export default function UsertaskEdit() {
    const { task } = useLoaderData();
    return (
        <TaskPanel >
            <Addtask task={task} />
        </TaskPanel>
    )
}


import { useLoaderData } from "@remix-run/react";
import { Taskservice } from "~/server/service/task.server";
import { logto } from "~/services/authentication";
export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    const data: any = Object.fromEntries(await request.formData());
    console.log(data, context);
    const taskService = new Taskservice();
    const dataSaved = await taskService.updateTask({
        title: data.title,
        description: data.description,
        userId: context?.userInfo?.sub as string,
        id: params.id as string,
        tags: data.tags as string
    });
    console.log(dataSaved);
    return redirect(`/task/detail/${dataSaved.slug}`);
}