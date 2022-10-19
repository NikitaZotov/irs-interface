import * as React from "react";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { Button } from "@material-ui/core";
import "./Search.css";
import { useStateValue } from "../hooks/StateProvider";
import { useNavigate } from "react-router-dom";
import { ActionTypes } from "../hooks/reducer";

function Search({ hideButtons = false }) {
    const [, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [term, setTerm] = useState("");

    const search = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("search!");

        dispatch({
            type: ActionTypes.SET_SEARCH_TERM,
            term: term,
        });

        navigate(`/search`);
    };

    return (
        <form className="search">
            <div className="search__input">
                <SearchIcon className="search__inputIcon" />
                <input value={term} onChange={(e) => setTerm(e.target.value)} />
                <MicIcon />
            </div>
            {!hideButtons ? (
                <div className="search__buttons">
                    <Button onClick={search} type="submit" variant="outlined">
                        Google Search
                    </Button>
                    <Button variant="outlined">I'm Feeling Lucky</Button>
                </div>
            ) : (
                <div className="search__buttons">
                    <Button
                        className="search__buttonsHidden"
                        onClick={search}
                        type="submit"
                        variant="outlined"
                    >
                        Google Search
                    </Button>
                    <Button className="search__buttonsHidden" variant="outlined">
                        I'm Feeling Lucky
                    </Button>
                </div>
            )}
        </form>
    );
}

export default Search;
