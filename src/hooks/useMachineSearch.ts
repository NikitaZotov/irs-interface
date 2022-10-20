import { client } from "../api/Client"
import { useEffect, useState } from "react";
import { Snippet } from "../api/client/types";

export const useMachineSearch = (request: string) => {
    const [data, setData] = useState(new Array<Snippet>());
    console.log(request);
    useEffect(() => {
        const fetchData = async () => {
            const terms = request.split(" ");
            client.getDocumentsSnippets(terms).then(snippets => {
                setData(snippets);
            });
        };

        fetchData();
    }, [request]);

    return data;
};
