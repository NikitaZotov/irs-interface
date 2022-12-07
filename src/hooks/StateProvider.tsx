/* eslint-disable */
import React, { createContext, ReactElement, useContext, useReducer } from "react";
import { initialState, IState } from "./reducer";

const StateContext = createContext<IState | any>(initialState);

interface StateProps {
    reducer: IState | any,
    initialState: IState | any,
    children: ReactElement,
}

export const StateProvider = ({ reducer, initialState, children } : StateProps): ReactElement => {
    return (
        <StateContext.Provider value={ useReducer(reducer, initialState) }>
            {children}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);
