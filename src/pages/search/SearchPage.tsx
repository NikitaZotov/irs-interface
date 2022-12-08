/* eslint-disable */
import { ActionTypes } from "../../hooks/reducer";
import { Snippet } from "../../api/client/types";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../hooks/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../components/Search";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useMachineSearch } from "../../hooks/useMachineSearch";
import { getDocumentSummarizations } from "../../hooks/getSummarization";
import { getDocumentTranslations } from "../../hooks/getTranslation";
import SearchLogo from "./search_logo.png";
import DownloadLink from "react-download-link"
import {
    DocumentLink,
    TranslationLink,
    SearchPageHeader,
    SearchPageHeaderBody,
    SearchPageLogo,
    SearchPageNoResult,
    SearchPageResult,
    SearchPageResultCount,
    SearchPageResults,
    SearchPageResultSnippet,
    SpeechButton,
} from "./styled";
import { INTERFACE_URL } from "../../constants/common";
import { VoiceSelector } from "../../components/speech/VoiceSelector";
import { SpeechContainer } from "../../components/speech/styled";
import { rates, VoiceRateSelector } from "../../components/speech/VoiceRateSelector";

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

    const [selectedVoice, setSelectedVoice] = useState<number[]>([]);
    const setSelectedVoiceInc = (voice: number, index: number) => {
        setSelectedVoice((voices) => {
            return voices.length <= index
                ? [...voices, voice]
                : [...voices.slice(0, index), voice, ...voices.slice(index + 2)];
        });
    }

    const [selectedVoiceRate, setSelectedVoiceRate] = useState<number[]>([]);
    const setSelectedVoiceRateInc = (voiceRate: number, index: number) => {
        console.log(index);
        console.log(voiceRate);

        setSelectedVoiceRate((voiceRates) => {
            return voiceRates.length <= index
                ? [...voiceRates, voiceRate]
                : [...voiceRates.slice(0, index), voiceRate, ...voiceRates.slice(index + 2)];
        });
    }

    const viewDocumentTranslation = (e: any, snippet: Snippet) => {
        e.preventDefault();

        dispatch({
            type: ActionTypes.SET_SNIPPET,
            snippet: snippet,
        });

        navigate(`/translation/` + snippet.id);
    };

    const speak = (e: any, text: string, selectedVoice: number, selectedVoiceRate: number = 2) => {
        e.preventDefault();

        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = synth.getVoices()[selectedVoice];
        utterance.rate = rates[selectedVoiceRate].key;

        synth.cancel();
        synth.speak(utterance);
    };

    const cutText = (item: any) => {
        return item.document.substring(0, 250);
    };

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
                    snippets.map((item, index) => (
                        <SearchPageResult>
                            <DocumentLink>
                                {INTERFACE_URL}/document/{item.id}
                                <h2
                                    onClick={e => viewDocument(e, item)}>
                                    {cutText(item) + "..."}
                                </h2>
                            </DocumentLink>

                            <SearchPageResultSnippet>
                                Used keys: {item.terms.map(term => ` ${term}`).toString()}
                            </SearchPageResultSnippet>
                            <SearchPageResultSnippet>
                                Language: {item.langs.map(item => ` ${item.lang} (${item.method})`).toString()}
                            </SearchPageResultSnippet>
                            {getDocumentSummarizations(item.document).map(item =>
                                (<DownloadLink
                                    key={`down_link_${Math.random()}`}
                                    label={`Download summarization (${item.method})`}
                                    filename="summarization.txt"
                                    exportFile={item.callback}
                                />)
                            )}
                            <TranslationLink>
                                {getDocumentTranslations(item.document).map(item =>
                                    (<DownloadLink
                                        key={`down_translation_${Math.random()}`}
                                        label={`Download ${item.lang} translation`}
                                        filename="translation.txt"
                                        exportFile={item.callback}
                                    />)
                                )}
                            </TranslationLink>
                            <SpeechContainer>
                                <VoiceSelector
                                    selected={selectedVoice[index]}
                                    setSelected={(voice: number) => setSelectedVoiceInc(voice, index)}
                                    lang={item.langs[0].lang}
                                />
                                <VoiceRateSelector
                                    selected={selectedVoiceRate[index]}
                                    setSelected={(voiceRate: number) => setSelectedVoiceRateInc(voiceRate, index)}
                                />
                                <SpeechButton onClick={e =>
                                    speak(e, cutText(item), selectedVoice[index], selectedVoiceRate[index])
                                }>
                                    <i className="fa fa-file-audio-o"></i>
                                </SpeechButton>
                            </SpeechContainer>
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
