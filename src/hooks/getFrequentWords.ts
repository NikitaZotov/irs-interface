import { mlClient } from "../api/Client"
export const getFrequentWords = (document: string) => {
    return [
        {client: mlClient, targetLanguage: "Germany"}
    ].map(item => {
        const createFrequentWordsDocument = (words: Map<string, string>) => {
            let document = "";
            words.forEach((value, key) => document += `${value} - ${key}\n`);
            return document;
        }

        return {
            lang: item.targetLanguage,
            callback: async () => {
                const [words] = await item.client.getDocumentsFrequentWords([document], item.targetLanguage);
                console.log(words)
                return createFrequentWordsDocument(words);
            }
        };
    });
};
