import * as React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SearchPage from "./pages/SearchPage";
import DocumentPage from "./pages/DocumentPage";

export const App = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/search" element={<SearchPage/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/document/*" element={<DocumentPage/>} />
                </Routes>
            </Router>
        </div>
    );
}
