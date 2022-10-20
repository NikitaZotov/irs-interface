export type Term = string;
export type Document = string;

export interface Response<
    Payload extends unknown = unknown,
    > {
    id: number;
    status: boolean;
    payload: Payload;
}

export interface IGetDocumentsAttribute {
    term: string,
    documents: Map<string, number>,
}

export interface IGetDocuments {
    attributes: IGetDocumentsAttribute[],
    documents: Map<string, Document>,
}

export interface DocumentAttributes {
    hash: string,
    significancy: number,
}

export interface Snippet {
    document: Document,
    terms: Term[],
    significancy: number,
}

export type TAction =
    | "add_documents"
    | "get_documents";

export type TWSCallback<
    Payload extends unknown = unknown,
    > = (data: Response<Payload>) => void;

type Args<
    Action extends TAction,
    Payload extends unknown,
    ResponsePayload extends unknown,
    > = [Action, Payload, TWSCallback<ResponsePayload>];

export type TAddDocumentsArgs = Args<
    "add_documents",
    Document[],
    boolean
    >;

export type TGetDocumentsArgs = Args<
    "get_documents",
    Term[],
    [DocumentAttributes[][], Map<string, Document>] | Snippet[]
    >;