import React from "react";
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
import { Link } from "react-router-dom";

function SearchPage() {
    const [{ terms }, dispatch] = useStateValue();

    const snippets = useMachineSearch(terms);

    console.log(snippets);

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
                    <Search hideButtons />
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

            {terms && (
                <div className="searchPage__results">
                    <p className="searchPage__resultCount">
                        {/*About {snippets.searchInformation.formattedTotalResults} results (*/}
                        {/*{snippets.searchInformation.formattedSearchTime} seconds) for{" "}*/}
                        <strong>{terms}</strong>
                    </p>

                    {snippets.map((item) => (
                        <div className="searchPage__result">
                            <a className="searchPage__resultTitle">
                                <h2>{item.document}</h2>
                            </a>

                            <p className="searchPage__resultSnippet">{item.terms.toString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchPage;
