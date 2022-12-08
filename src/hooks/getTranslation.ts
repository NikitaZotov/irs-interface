import { mlClient } from "../api/Client"
export const getDocumentTranslations = (document: string) => {
    return [
        {client: mlClient, targetLanguage: "Germany"}
    ].map(item => {
        return {
            lang: item.targetLanguage,
            callback: async () => await item.client.getDocumentsTranslations([document], item.targetLanguage)
        }
    });
};
