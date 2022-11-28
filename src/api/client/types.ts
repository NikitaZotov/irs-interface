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
    id: string,
    document: Document | any,
    terms: Term[],
    significancy: number | any,
    langs: Array<string>,
}

export type TAction =
    | "add_documents"
    | "get_documents"
    | "get_langs";

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
    IGetDocuments
    >;

export type TGetDocumentsLangsArgs = Args<
    "get_langs",
    Document[],
    string[]
    >;
