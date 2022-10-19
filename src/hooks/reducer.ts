export interface IState {
    term: null,
}

export const initialState = {
    term: null,
};

export enum ActionTypes {
    SET_SEARCH_TERM = "SET_SEARCH_TERM",
}

export type IAction = {
    type: ActionTypes.SET_SEARCH_TERM,
    term: any
}

const reducer = (state: IState, action: IAction): IState => {
    console.log(action);
    switch (action.type) {
        case ActionTypes.SET_SEARCH_TERM:
            return {
                ...state,
                term: action.term,
            };

        default:
            return state;
    }
};

export default reducer;
