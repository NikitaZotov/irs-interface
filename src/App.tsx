import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import SearchPage from "./pages/search/SearchPage";
import DocumentPage from "./pages/document/DocumentPage";

export const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/search" element={<SearchPage/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/document/*" element={<DocumentPage/>} />
                    <Route path="/translation/*" element={<DocumentPage/>} />
                </Routes>
            </Router>
        </div>
    );
}
