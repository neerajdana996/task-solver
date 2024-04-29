import type { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import { uploadFile } from '~/server/upload-service.server';
export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    const query = new URLSearchParams(request.url.split("?")[1]);
    const path = query.get("path") || undefined,
        existingKey = query.get("existingKey") || undefined;
    console.log("path", path, existingKey);
    return await uploadFile({ request, path, existingKey });

}