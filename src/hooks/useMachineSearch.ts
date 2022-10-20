import { client } from "../api/Client"

export const useMachineSearch = async (request: string) => {
    const terms = request.split(" ")
    return await client.getDocumentsSnippets(terms);
};
