import { LogtoContext } from "@logto/remix";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import HomePage from "~/components/landing/homepage";
import { logto } from "~/services/authentication";

type LoaderResponse = {
  readonly context: LogtoContext;
};

export const loader: LoaderFunction = async ({ request }) => {
  const context = await logto.getContext({ getAccessToken: false, fetchUserInfo: true })(
    request
  );


  return json<LoaderResponse>({ context });
}
export default function _index() {
  const data = useLoaderData<LoaderResponse>();

  return (
    <HomePage isAuthenticated={data?.context?.isAuthenticated} userInfo={data?.context?.userInfo} />
  )
}
