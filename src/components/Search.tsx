import * as React from "react";
import { ActionTypes } from "../hooks/reducer";
import { useEffect, useState } from "react";
import { useStateValue } from "../hooks/StateProvider";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { SearchButton, SearchButtonHidden, SearchInput, MicroButton } from "./styled";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export const Search = ({ hideButtons = false }) => {
    const [, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [input, setInput] = useState("");

    const search = (e: any) => {
        // e.preventDefault();
        dispatch({
            type: ActionTypes.SET_SEARCH_TERM,
            terms: input,
        });

        navigate(`/search`);
    };

    const [getLocalTerms, setLocalTerms,] = useLocalStorage("terms");

    const onChange = (e: any) => {
        e.preventDefault();

        setInput(e.target.value);
        setLocalTerms(e.target.value);
    }

    const handleKeypress = (e: any) => {
        if (e.key === "Enter") {
            search(e);
        }
    };

    const preventKeypress = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    useEffect(() => {
        setInput(getLocalTerms());
    }, [getLocalTerms]);

    const commands = [
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
        {
            command: 'good bye',
            callback: () => setInput('I wasn\'t talking.')
        },
        {
            command: 'Hello',
            callback: () => setInput('Hi there!')
        },
    ]

    const { finalTranscript, resetTranscript } = useSpeechRecognition({ commands });
    useEffect(() => {
        console.log(finalTranscript);
        if (finalTranscript !== "") {
            setSpeaking(false);
            setInput(finalTranscript);
            resetTranscript();
        }
    });

    const [isSpeaking, setSpeaking] = useState(false);
    const speechToInput = (e: any) => {
        e.preventDefault();

        setSpeaking(!isSpeaking);
        setSpeaking(isSpeaking => {
            if (isSpeaking) {
                SpeechRecognition.startListening({
                    continuous: true,
                })
            } else {
                SpeechRecognition.stopListening();
            }
            return isSpeaking;
        });
    };

    return (
        <form onKeyDown={preventKeypress}>
            <SearchInput>
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Type request"
                    value={input}
                    onChange={onChange}
                    onKeyDown={handleKeypress}
                />
                <div>
                    <MicroButton isSpeaking={isSpeaking} onClick={speechToInput}>
                        <i className="fa fa-microphone"></i>
                    </MicroButton>
                </div>
            </SearchInput>
            {!hideButtons ? (
                <SearchButton>
                    <Button onClick={search} type="submit" variant="outlined">
                        Search
                    </Button>
                </SearchButton>
            ) : (
                <SearchButton>
                    <SearchButtonHidden onClick={search} type="submit">
                        Search
                    </SearchButtonHidden>
                </SearchButton>
            )}
        </form>
    );
}
