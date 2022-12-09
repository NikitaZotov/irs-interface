/* eslint-disable */
import { useCallback, useEffect, useState } from "react";
import { Select, Option } from "./styled";

const synth = window.speechSynthesis;

const langs = [
    { key: "en", lang: "English" },
    { key: "fr", lang: "French" },
    { key: "it", lang: "Italian" },
    { key: "de", lang: "Germany" },
];

export const VoiceSelector = ({ selected, setSelected, lang }: any) => {
    const [voices, setVoices] = useState<[{ name: string, lang: string }]>();

    const populateVoiceList = useCallback(() => {
        const newVoices = synth.getVoices();

        const names = [] as unknown as [{ name: string, lang: string }];
        newVoices.forEach((voice) => {
            const found = langs.find(value => voice.lang.startsWith(value.key));
            if (found) {
                names.push({ name: voice.name, lang: found.lang });
            }
        });

        setSelected(names.findIndex(item => item.lang === lang));

        setVoices(names);
    }, []);

    useEffect(() => {
        populateVoiceList();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoiceList;
        }
    }, [populateVoiceList]);

    return (
        <Select
            value={selected}
            onChange={(e) => setSelected(parseInt(e.target.value))}
        >
            {voices?.map((voice, index) => (
                <Option key={index} value={index}>
                    {voice.name} ({voice.lang})
                </Option>
            ))}
        </Select>
    );
};
