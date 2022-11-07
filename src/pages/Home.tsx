import * as React from "react";
import "./Home.css";
import Search from "../components/Search";

function Home() {
    return (
        <div className="home">
            <div className="home__header">
            </div>

            <div className="home__body">
                <img
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                    alt="logo"
                />
                <div className="home__inputContainer">
                    <Search />
                </div>
            </div>
        </div>
    );
}

export default Home;
