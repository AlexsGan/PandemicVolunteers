import React from "react";
import {Grid, Button} from "@material-ui/core"
import { Redirect } from "react-router-dom"
import "./styles.css";

/* Navigation Bar Component for Landing page */
class Navbar extends React.Component {
    state = {
        redirectPath: "",
    }

    handleClick = (event) => {
        const target = event.currentTarget;
        this.setState({redirectPath: target.value});
        console.log(target.value)
    }

    render() {
        const {
            currentPath
        } = this.props;

        // Handle redirects
        if (this.state.redirectPath !== "") {
            console.log(this.state.redirectPath)
            return (
                <Redirect 
                    to={{
                        pathname: this.state.redirectPath,
                        state: { userObject: this.props.userObject }
                    }}
                />
            )
        }
        
        return (
            <Grid container spacing={1} className="background">
                <Grid item xs={4}>
                <div className="titleBackground">
                    <h1 className="appName">To be named later</h1>
                </div>
                </Grid>
                <Grid item xs={2}>
                <Button
                    value="/requests"
                    variant="contained"
                    color="default"
                    onClick={this.handleClick}
                    disabled={currentPath === "/requests"}
                >
                    <h3 className="nav_text">Requests Dashboard</h3>
                </Button> 
                </Grid>
                <Grid item xs={2}>
                <Button
                    value="/group-chat"
                    variant="contained"
                    color="default"
                    onClick={this.handleClick}
                    disabled={currentPath === "/group-chat"}
                >
                    <h3 className="nav_text">Group Chat</h3>
                </Button> 
                </Grid>
                <Grid item xs={2}>
                <Button
                    value=""
                    variant="contained"
                    color="default"
                    onClick={this.handleClick}
                    disabled={currentPath === ""}
                    >
                    <h3 className="nav_text">About Us</h3>
                </Button> 
                </Grid>
                <Grid item xs={2}>
                {/* If user object was provided, we are logged in */}
                {this.props.userObject !== null ? (
                        // Access profile
                        <Button
                            value="/profile"
                            variant="contained"
                            color="default"
                            onClick={this.handleClick}
                            disabled={currentPath === "/profile"}
                        >
                            <h3 className="nav_text">Profile</h3>
                        </Button> 
                    ) : (
                        // Access login
                        <Button
                            value="/login"
                            variant="contained"
                            color="default"
                            onClick={this.handleClick}
                            disabled={currentPath === "/login"}
                        >
                            <h3 className="nav_text">Log In</h3>
                        </Button> 
                    )
                }
                </Grid>

            </Grid>
        );
    }
}

export default Navbar;
