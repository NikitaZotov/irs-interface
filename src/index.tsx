import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./hooks/reducer";
import { StateProvider } from "./hooks/StateProvider";


ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
