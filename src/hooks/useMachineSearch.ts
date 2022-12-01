import { client, mlClient } from "../api/Client"
import { useEffect, useState } from "react";
import { Snippet } from "../api/client/types";

export const useMachineSearch = (request: string) => {
    const [data, setData] = useState(new Array<Snippet>());
    useEffect(() => {
        const fetchData = async () => {
            const terms = request ? request.split(" ") : [];
            client.getDocumentsSnippets(terms).then(snippets => {
                const documents = snippets.map((item: Snippet) => item.document);
                [client, mlClient].forEach(async (client, index) => {
                    const langs = await client.getDocumentsLangs(documents);
                    snippets.forEach((snippet, index) => snippet.langs.push(langs.at(index) as string));

                    if (index == 1) {
                        setData(snippets);
                    }
                });
            });
        };

        fetchData();
    }, [request]);

    return data;
};
