/* eslint-disable */
export interface IState {
    terms: null,
    snippet: null,
}

export const initialState = {
    terms: null,
    snippet: null,
};

export enum ActionTypes {
    SET_SEARCH_TERM = "SET_SEARCH_TERM",
    SET_SNIPPET = "SET_SNIPPET",
}

export type IAction = {
    type: ActionTypes.SET_SEARCH_TERM | ActionTypes.SET_SNIPPET,
    terms: any,
    snippet: any,
}

const reducer = (state: IState, action: IAction): IState => {
    console.log(action);
    switch (action.type) {
        case ActionTypes.SET_SEARCH_TERM:
            return {
                ...state,
                terms: action.terms,
            };

        case ActionTypes.SET_SNIPPET:
            return {
                ...state,
                snippet: action.snippet,
            };

        default:
            return state;
    }
};

export default reducer;
