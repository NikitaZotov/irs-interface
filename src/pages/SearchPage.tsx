import React, { useEffect, useState } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useMachineSearch } from "../hooks/useMachineSearch";
import "./SearchPage.css";
import Search from "../components/Search";
import { Link, useNavigate } from "react-router-dom";
import { ActionTypes } from "../hooks/reducer";
import { Snippet } from "../api/client/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SearchLogo from "./search/search_logo.png";

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
        <div className="searchPage">
            <div className="searchPage__header">
                <Link to="/">
                    <img
                        className="searchPage__logo"
                        src={SearchLogo}
                        alt=""
                    />
                </Link>

                <div className="searchPage__headerBody">
                    <Search hideButtons />
                </div>
            </div>

            {terms
            ? (
                <div className="searchPage__results">
                    <p className="searchPage__resultCount">
                        About {snippets.length} results ({perfTime} seconds) for{" "} <strong>{terms}</strong>
                    </p>

                    {snippets.map((item) => (
                        <div className="searchPage__result">
                            <a className="searchPage__resultTitle">
                                {"http:://localhost:3000/document/" + item.id}
                                <h2
                                    onClick={e => viewDocument(e, item)}>
                                        {item.document.substring(0, 250) + "..."}
                                </h2>
                            </a>

                            <p className="searchPage__resultSnippet">
                                {"Used keys: " + item.terms.map(term => " " + term).toString()}
                            </p>
                            <p className="searchPage__resultSnippet">
                                {"Language: " + item.langs.at(0) + "(FWM), " + item.langs.at(1) + "(MLM)"}
                            </p>
                        </div>
                    ))}
                </div>
            )
            : (
                <div className="searchPage__results">
                    <p className="searchPage__resultCount">
                        About {snippets.length} results (
                        {perfTime} seconds) for{" "}
                        <strong>{terms}</strong>
                    </p>

                    <div className="searchPage__no_result">
                        <p>Oops... There are no found information by this request.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchPage;
