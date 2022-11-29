import * as React from "react";
import { ActionTypes } from "../hooks/reducer";
import { useEffect, useState } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { SearchButtons, SearchButtonHidden, SearchInput, SearchInputIcon } from "./styled";

export const Search = ({ hideButtons = false }) => {
    const [, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [terms, setTerm] = useState("");

    const search = (e: any) => {
        e.preventDefault();

        dispatch({
            type: ActionTypes.SET_SEARCH_TERM,
            terms: terms,
        });

        navigate(`/search`);
    };

    const [getLocalTerms, setLocalTerms,] = useLocalStorage("terms");

    const onChange = (e: any) => {
        setTerm(e.target.value);
        setLocalTerms(e.target.value);
    }

    useEffect(() => {
        setTerm(getLocalTerms());
    }, [getLocalTerms]);

    return (
        <form>
            <SearchInput>
                <SearchIcon className={SearchInputIcon} />
                <input value={terms} onChange={onChange} />
            </SearchInput>
            {!hideButtons ? (
                <SearchButtons>
                    <Button onClick={search} type="submit" variant="outlined">
                        Search
                    </Button>
                </SearchButtons>
            ) : (
                <SearchButtons>
                    <SearchButtonHidden onClick={search} type="submit">
                        Google Search
                    </SearchButtonHidden>
                </SearchButtons>
            )}
        </form>
    );
}
