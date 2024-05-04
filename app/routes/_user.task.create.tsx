import TaskPanel from "~/components/task/addTask/addPanel";
import Addtask from "~/components/task/addTask/addtask";


export default function usertaskcreate() {

    return (
        <TaskPanel >
            <Addtask />
        </TaskPanel>
    )
}


import { redirect, type ActionFunction, type ActionFunctionArgs } from '@remix-run/node';
import { Taskservice } from "~/server/service/task.server";
import { logto } from "~/services/authentication";
export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    const data: any = Object.fromEntries(await request.formData());
    console.log(data, context);
    const taskService = new Taskservice();
    const dataSaved = await taskService.addTask({
        title: data.title,
        description: data.description,
        userId: context?.userInfo?.sub as string,
        tags: data.tags as string
    });
    console.log(dataSaved);
    return redirect("/task");
}