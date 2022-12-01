import { ActionTypes } from "../../hooks/reducer";
import { Snippet } from "../../api/client/types";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../hooks/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../components/Search";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useMachineSearch } from "../../hooks/useMachineSearch";
import { useDocumentSummarizations } from "../../hooks/useSummarization";
import SearchLogo from "./search_logo.png";
import DownloadLink from "react-download-link"
import {
    SearchPageHeader,
    SearchPageHeaderBody,
    SearchPageLogo,
    SearchPageNoResult,
    SearchPageResult,
    SearchPageResultCount,
    SearchPageResults,
    SearchPageResultSnippet,
    SearchPageResultTitle
} from "./styled";

function SearchPage() {
    const [{ input }, dispatch] = useStateValue();
    const [terms, setTerms] = useState(input);

    const [getLocalTerms, setLocalTerms,] = useLocalStorage("terms");

    useEffect(() => {
        const local = getLocalTerms();
        local
        ? setTerms(local)
        : setLocalTerms(terms);
    }, [getLocalTerms, setLocalTerms]);

    const navigate = useNavigate();
    const viewDocument = (e: any, snippet: Snippet) => {
        e.preventDefault();

        dispatch({
            type: ActionTypes.SET_SNIPPET,
            snippet: snippet,
        });

        navigate(`/document/` + snippet.id);
    };

    const [snippets, perfTime] = ((terms: string) => {
        const startTime = performance.now();
        const snippets = useMachineSearch(terms);
        const endTime = performance.now();

        const perfTime = endTime - startTime;
        return [snippets, perfTime];
    })(terms);

    return (
        <div>
            <SearchPageHeader>
                <Link to="/">
                    <SearchPageLogo src={SearchLogo} alt="" />
                </Link>

                <SearchPageHeaderBody>
                    <Search hideButtons />
                </SearchPageHeaderBody>
            </SearchPageHeader>

            <SearchPageResults>
                <SearchPageResultCount>
                    About {snippets.length} results ({perfTime} seconds) for <strong>{terms}</strong>
                </SearchPageResultCount>

                {terms ?
                    snippets.map((item) => (
                        <SearchPageResult>
                            <SearchPageResultTitle>
                                http:://localhost:3000/document/{item.id}
                                <h2
                                    onClick={e => viewDocument(e, item)}>
                                    {item.document.substring(0, 250) + "..."}
                                </h2>
                            </SearchPageResultTitle>

                            <SearchPageResultSnippet>
                                Used keys: {item.terms.map(term => ` ${term}`).toString()}
                            </SearchPageResultSnippet>
                            <SearchPageResultSnippet>
                                Language: {item.langs.at(0)} (FWM), {item.langs.at(1)} (MLM)
                            </SearchPageResultSnippet>
                            {useDocumentSummarizations(item.document).map(item =>
                                (<DownloadLink
                                        label={`Download summarization (${item.method})`}
                                        filename="summarization.txt"
                                        exportFile={item.callback}
                                    />
                                )
                            )}
                        </SearchPageResult>
                    ))
                    :
                    (<SearchPageNoResult>
                        Oops... There are no found information by this request.
                    </SearchPageNoResult>)
                }
            </SearchPageResults>
        </div>
    );
}

export default SearchPage;
