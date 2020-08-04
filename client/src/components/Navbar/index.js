import React from "react";
import { Typography, Tabs, AppBar, Tab } from "@material-ui/core"
import { Link, Redirect } from "react-router-dom"
import "./styles.css";

/* Navigation Bar Component for Landing page */
class Navbar extends React.Component {
    state = {
        redirectPath: this.props.currentPath,
    }

    handleClick = (event, newValue) => {
        this.setState({ redirectPath: newValue });
        console.log(newValue)
    }

    render() {
        const {
            currentPath,
            loggedIn
        } = this.props;

        // Handle redirects
        /*if (this.state.redirectPath !== currentPath) {
            console.log(this.state.redirectPath)
            return (
                <Redirect
                    to={{
                        pathname: this.state.redirectPath,
                        // state: { userObject: this.props.userObject }
                    }}
                />
            )
        }*/

        return (
            <AppBar position="static">
                <Typography
                    className="navbar__app-name"
                    variant="h2"
                >
                    PandemicVolunteers
                </Typography>
                <Tabs
                    className="navbar__tabs"
                    //value={this.state.redirectPath}
                    onChange={this.handleClick}
                    centered
                >
                    <Tab label="Home" component={Link} to="/home"/>
                    <Tab label="About Us" component={Link} to="/about" disabled={true}/>
                    <Tab label="Map" component={Link} to="/map" disabled={true}/>
                    <Tab label="Requests" component={Link} to="/requests"/>
                    <Tab label="Group Chats" component={Link} to="/group-chat"/>
                    {
                        loggedIn ? (
                            <Tab label="Profile" component={Link} to="/profile"/>
                        ) : (
                            <Tab label="Login" component={Link} to="/login"/>
                        )
                    }
                </Tabs>
            </AppBar>
        );
    }
}

export default Navbar;
