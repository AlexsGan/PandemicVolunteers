import React from "react";
import Navbar from "../Navbar";
import HomeContent from "./HomeContent"

import "./styles.css"

/* Component for home page */
class Home extends React.Component {
    render() {
        return (
            <div className="home-view">

                {/*navigation bar at the top of the landing screen */}
                <Navbar userObject={null} currentPath="/home"/>

                {/*content of the landing screen*/}
                <HomeContent/>


            </div>

        );
    }
}

export default Home;
