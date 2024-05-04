import DashboardLayout from "~/components/dashboard/DashboardLayout";

import { json, redirect, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from "@remix-run/react";
import { UserService } from "~/server/service/user.server";
import { logto } from "~/services/authentication";
export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    if (context.isAuthenticated && context?.userInfo?.sub && !request.url.includes('/onboarding')) {
        const IsUserOnboarded = await UserService.IsUserOnboarded(context?.userInfo)
        console.log("IsUserOnboarded", IsUserOnboarded)
        if (!IsUserOnboarded) {
            return redirect("onboarding", {});
        }

    }
    return json({ context });
}
export default function userdashboard({ children }) {
    return (
        <DashboardLayout>

            <Outlet />
        </DashboardLayout>
    )
}
