import React from "react";
import Navbar from "./Navbar";
import TitlePage from "./TitlePage"

import "./styles.css"
/* Component for Landing page */
class View extends React.Component {
  render() {
    return (
      <div className="landing-view" >

        {/*navigation bar at the top of the landing screen */}
        <Navbar />
        
        {/*content of the landing screen*/}
        <TitlePage/>


      </div>
        
    );
  }
}

export default View;
