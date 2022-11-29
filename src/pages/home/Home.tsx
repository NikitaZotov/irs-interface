import * as React from "react";
import { Search } from "../../components/Search";
import SearchLogo from "./search_logo.png";
import { HomePage, HomePageHeader, HomePageBody, HomePageInputContainer } from "./styled";

export const Home = () => {
    return (
        <HomePage>
            <HomePageHeader/>

            <HomePageBody>
                <img
                    src={SearchLogo}
                    alt="logo"
                />
                <HomePageInputContainer>
                    <Search/>
                </HomePageInputContainer>
            </HomePageBody>
        </HomePage>
    );
}
