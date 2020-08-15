import React from "react";
import HomeContent from "./HomeContent"

import "./styles.css"

/* Component for home page */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/home");
        this.app = this.props.app;
    }
    render() {
        return (
            <div className="home-view">

                {/*navigation bar at the top of the landing screen */}
                {/*<Navbar userObject={null} currentPath="/home"/>*/}

                {/*content of the landing screen*/}
                <HomeContent/>


            </div>

        );
    }
}

export default Home;
