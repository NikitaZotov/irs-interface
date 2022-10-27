import React, { useEffect, useState } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useMachineSearch } from "../hooks/useMachineSearch";
import "./SearchPage.css";
import Search from "../components/Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { ActionTypes } from "../hooks/reducer";
import { Snippet } from "../api/client/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

function SearchPage() {
    const [{ terms }, dispatch] = useStateValue();

    const navigate = useNavigate();

    const viewDocument = (e: any, snippet: Snippet) => {
        e.preventDefault();

        dispatch({
            type: ActionTypes.SET_SNIPPET,
            snippet: snippet,
        });

        navigate(`/document/` + snippet.id);
    };

    const [getTerms, setTerms,] = useLocalStorage("terms");

    useEffect(() => {
        const local = getTerms();
        local
        ? dispatch({
            terms: local,
        })
        : setTerms(terms);
    }, [getTerms, setTerms]);

    const startTime = performance.now();
    const snippets = useMachineSearch(terms);
    const endTime = performance.now();

    const perfTime = endTime - startTime;

    return (
        <div className="searchPage">
            <div className="searchPage__header">
                <Link to="/">
                    <img
                        className="searchPage__logo"
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        alt=""
                    />
                </Link>

                <div className="searchPage__headerBody">
                    {/*<Search hideButtons />*/}
                    <div className="searchPage__options">
                        <div className="searchPage__optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon />
                                <Link to="/all">All</Link>
                            </div>
                            <div className="searchPage__option">
                                <DescriptionIcon />
                                <Link to="/news">News</Link>
                            </div>
                            <div className="searchPage__option">
                                <ImageIcon />
                                <Link to="/images">Images</Link>
                            </div>
                            <div className="searchPage__option">
                                <LocalOfferIcon />
                                <Link to="/shopping">shopping</Link>
                            </div>
                            <div className="searchPage__option">
                                <RoomIcon />
                                <Link to="/maps">maps</Link>
                            </div>
                            <div className="searchPage__option">
                                <MoreVertIcon />
                                <Link to="/more">more</Link>
                            </div>
                        </div>

                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">
                                <Link to="/settings">Settings</Link>
                            </div>
                            <div className="searchPage__option">
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {terms
            ? (
                <div className="searchPage__results">
                    <p className="searchPage__resultCount">
                        About {snippets.length} results (
                        {perfTime} seconds) for{" "}
                        <strong>{terms}</strong>
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

                            <p className="searchPage__resultSnippet">{"Used keys: " + item.terms.map(term => " " + term).toString()}</p>
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
