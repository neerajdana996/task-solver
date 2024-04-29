
import { json, type LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node';
import { logto } from "~/services/authentication";
export const loader: LoaderFunction = async ({ request, params }: LoaderFunctionArgs) => {
    const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
        request
    );
    return json({ context });
}
export default function userdashboard({ children }) {
    return (
        <div className="flex flex-col h-screen">


        </div>
    )
}
