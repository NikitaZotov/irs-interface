import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer, { initialState } from "./hooks/reducer";
import { StateProvider } from "./hooks/StateProvider";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>
);

reportWebVitals();
