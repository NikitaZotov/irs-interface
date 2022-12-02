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
                [
                    { method_type: 1, method_name: "FWM", client: client },
                    { method_type: 2, method_name: "AM", client: client },
                    { method_type: 0, method_name: "MLM", client: mlClient }
                ].forEach(async (item, index) => {
                    const langs = await item.client.getDocumentsLangs(item.method_type, documents);
                    snippets.forEach((snippet, index) => {
                        snippet.langs.push({lang: langs.at(index) as string, method: item.method_name})
                    });

                    if (index == 2) {
                        setData(snippets);
                    }
                });
            });
        };

        fetchData();
    }, [request]);

    return data;
};
