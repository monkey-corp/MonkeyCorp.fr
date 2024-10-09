import React from "react";
import './Home.scss'
// import { useIntl } from "react-intl";
import Logo from './../assets/logos/logo-dos.png'
import DotLoader from "../components/DotLoader";
import MonkeySprite from "../components/MonkeySprite";

const Home = () => {
    // const intl = useIntl()

    return (
        <div className="Home">
            <div className="home-container">
                <div className="home-content">
                    <div className="logo"><img src={Logo} alt={}/></div>
                    <div className="in-comming-text">
                        <div className="in-comming-sprite">
                            <MonkeySprite/>
                        </div>
                        <DotLoader>{'in-comming'}</DotLoader>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home