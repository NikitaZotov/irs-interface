import {client, mlClient} from "../api/Client"

export const getDocumentSummarizations = (document: string) => {
   return [
       {client: client, method: "SEM"},
       {client: mlClient, method: "MLM"}
   ].map(item => {
       return {
           method: item.method,
           callback: async () => await item.client.getDocumentsSummarizations([document])
       }
   });
};
