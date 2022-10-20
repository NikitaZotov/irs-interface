import * as React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SearchPage from "./pages/SearchPage";

export const App = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}
