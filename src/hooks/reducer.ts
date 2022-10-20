export interface IState {
    terms: null,
}

export const initialState = {
    terms: null,
};

export enum ActionTypes {
    SET_SEARCH_TERM = "SET_SEARCH_TERM",
}

export type IAction = {
    type: ActionTypes.SET_SEARCH_TERM,
    terms: any
}

const reducer = (state: IState, action: IAction): IState => {
    console.log(action);
    switch (action.type) {
        case ActionTypes.SET_SEARCH_TERM:
            return {
                ...state,
                terms: action.terms,
            };

        default:
            return state;
    }
};

export default reducer;
