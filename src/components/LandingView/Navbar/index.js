import React from "react";
import {Grid, Button} from "@material-ui/core"
import { Link } from "react-router-dom"
import "./navbar.css";

/* Navigation Bar Component for Landing page */
class Navbar extends React.Component {
  render() {
    return (
      <Grid container spacing={1} className="background">
        <Grid item xs={4}>
          <div className="titleBackground">
            <h1 className="appName">To be named later</h1>
          </div>
        </Grid>
        <Grid item xs={2.5}>
          <Link className="link" to="/Requests">
            <Button variant="contained" color="default">
              <h3 className="nav_text">Requests Dashboard</h3>
            </Button> 
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link className="link" to="/GroupChat">
            <Button variant="contained" color="default">
              <h3 className="nav_text">Group Chat</h3>
            </Button> 
          </Link>
              
        </Grid>
        <Grid item xs={2}>
          <Link className="link">
            <Button variant="contained" color="default">
              <h3 className="nav_text">About Us</h3>
            </Button> 
          </Link>
        </Grid>
        <Grid item xs={1.5}>
          <Link className="link" to="/register">
            <Button variant="contained" color="default">
              <h3 className="nav_text">Log In</h3>
            </Button> 
          </Link>
        </Grid>
  
      </Grid>
        
    );
  }
}

export default Navbar;
