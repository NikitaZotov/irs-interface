import {
    Term,
    Document,
    TAction,
    TAddDocumentsArgs,
    TGetDocumentsArgs,
    TWSCallback,
    DocumentAttributes,
    IGetDocuments, Snippet
} from "./types";

export interface Response<T = any> {
    id: number;
    status: boolean;
    payload: T;
}

export interface Request<T = any> {
    id: number;
    type: TAction;
    payload: T;
}

export class IrsClient {
    private _eventID: number;
    private _messageQueue: Array<() => void>;
    private _socket: WebSocket;
    private _callbacks: Record<number, TWSCallback>;

    constructor(arg: string | WebSocket) {
        this._socket = typeof arg === "string" ? new WebSocket(arg) : arg;
        this._socket.onmessage = this.onMessage;
        this._socket.onopen = this.sendMessagesFromQueue;

        this._messageQueue = [];
        this._callbacks = {};
        this._eventID = 1;
    }

    private sendMessagesFromQueue = () => {
        this._messageQueue.forEach((func) => func());
        this._messageQueue = [];
    };

    private onMessage = (messageEvent: MessageEvent) => {
        const data = JSON.parse(messageEvent.data.toString()) as Response;
        const cmdID = data.id;
        const callback = this._callbacks[cmdID];

        if (!callback) {
            throw `Can't find callback for a command ${cmdID}`;
        }

        delete this._callbacks[cmdID];

        callback(data);
    };

    private sendMessage(...args: TAddDocumentsArgs): void;
    private sendMessage(...args: TGetDocumentsArgs): void;

    private sendMessage(actionType: string, payload: unknown, callback: TWSCallback<any>): void {
        this._eventID++;

        if (this._callbacks[this._eventID]) {
            throw "Invalid state of messages queue";
        }

        this._callbacks[this._eventID] = callback;
        const data = JSON.stringify({
            id: this._eventID,
            type: actionType,
            payload,
        });

        const sendData = () => this._socket.send(data);

        if (this._socket.readyState !== this._socket.OPEN) {
            this._messageQueue.push(sendData);
            return;
        }
        sendData();
    }

    public async addDocuments(documents: Document[]) {
        return new Promise<boolean>((resolve) => {
            if (!documents.length) return resolve(false);

            this.sendMessage("add_documents", documents, (response) => {
                resolve(response.status);
            });
        });
    }

    public async getDocuments(terms: Term[]) {
        return new Promise<[Map<string, DocumentAttributes[]>, Map<string, Document>]>((resolve) => {
            if (!terms.length) return resolve([new Map(), new Map()]);

            this.sendMessage("get_documents", terms, (response) => {
                const payload = JSON.parse(response.payload.toString()) as IGetDocuments;
                const attributes = payload.attributes;

                let documentsAttributes = new Map<string, DocumentAttributes[]>();
                attributes.forEach((attribute, index) => {
                    let documentsAttribute: DocumentAttributes[] = [];
                    attribute.documents.forEach((value, key) => {
                        documentsAttribute.push({ hash: key, significancy: value });
                    });
                    documentsAttributes.set(terms[index], documentsAttribute);
                });

                const documents = payload.documents;
                resolve([documentsAttributes, documents]);
            });
        });
    }

    public async getDocumentsSnippets(terms: Term[]) {
        return new Promise<Snippet[]>((resolve) => {
            if (!terms.length) return resolve([]);

            this.sendMessage("get_documents", terms, (response) => {
                const payload = JSON.parse(response.payload.toString()) as IGetDocuments;
                const attributes = payload.attributes;
                const documents = payload.documents;

                let cachedDocuments = new Map<string, Snippet>();
                attributes.forEach((attribute, index) => {
                    attribute.documents.forEach((value, key) => {
                        cachedDocuments.get(key)
                            ? cachedDocuments.get(key)?.terms.push(terms[index])
                            : cachedDocuments.set(key, { document: documents.get(key) ?? "", significancy: value, terms: [terms[index]] });
                    });

                });

                const result = Array.from(cachedDocuments.values()).filter(snippet => snippet.terms.length == terms.length);
                resolve(result);
            });
        });
    }
}