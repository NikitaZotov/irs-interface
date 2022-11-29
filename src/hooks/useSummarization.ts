import { client, mlClient } from "../api/Client"

export const getDocumentSummarization = async (document: string) => {
    let summars = new Array<string>();

    const [summar] = await mlClient.getDocumentsSummarizations([document]);
    summars.push(summar);

    return summars;
};
