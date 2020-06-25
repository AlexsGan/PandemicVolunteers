import React from "react";
import NavBar from "./../navbar";

import "./styles.css";

/* Component for Landing page */
class Landing extends React.Component {
  render() {
    return (
      <div className="landing-view">

        {/*navigation bar at the top of the landing screen */}
        <Navbar />

        <div className="title-page">
          
        </div>
      </div>
        
    );
  }
}

export default Landing;
