import * as React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Search from "./components/Search";

export const App = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/search" element={<Search />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}
