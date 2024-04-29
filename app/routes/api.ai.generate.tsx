import type { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import OpenAi from 'openai';

const contentGeneration = (prompt: string) => {
    return `
        act as an expert content writter 
        based on input prompt "${prompt}"
        generate next  content paragraph 
            it should be 100% unique and plagiarism free
            it whould be strictly based on the input prompt 
            it should not be more then 200 words
        `
}
export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    const body = await request.json()
    const apiKey = process.env.OPENAI_API_KEY;
    const openApi = new OpenAi({
        apiKey,
        organization: "org-BqkHOeNWPmOHL3b7MKTwAsDI"
    })
    if (!apiKey) {
        throw new Error("No OpenAI API key found");
    }
    const apiResponse = await openApi.chat.completions.create({
        messages: [{
            content: contentGeneration(body?.prompt),
            role: 'user'
        }],
        model: 'gpt-3.5-turbo-16k-0613'
    });
    if (apiResponse?.choices?.length > 0)
        return apiResponse.choices[0].message.content

    return "";

}