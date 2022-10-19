export type Term = string;
export type Document = string;

export interface Response<
    Payload extends unknown = unknown,
    > {
    id: number;
    status: boolean;
    payload: Payload;
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
    Map<Term, Map<Document, number>>
    >;
