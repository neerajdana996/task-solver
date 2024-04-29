import DashboardLayout from "~/components/dashboard/DashboardLayout";

import { json, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from "@remix-run/react";
import TaskHeading from "~/components/task/taskHeading";
import { logto } from "~/services/authentication";
export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    return json({ context });
}
export default function userdashboard({ children }) {
    return (
        <DashboardLayout>
            <TaskHeading />
            <Outlet />
        </DashboardLayout>
    )
}
