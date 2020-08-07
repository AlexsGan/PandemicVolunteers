import React from "react";
import { Typography, Tabs, AppBar, Tab } from "@material-ui/core"
import { Link, Redirect, withRouter } from "react-router-dom"
import "./styles.css";

/* Navigation Bar Component for Landing page */
class Navbar extends React.Component {

    render() {
        const loggedIn = this.props.loggedIn;
        const currentPath = this.props.location.pathname;

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
                    value={currentPath}
                    centered
                >
                    <Tab label="Home" component={Link} to="/home" value="/home"/>
                    <Tab label="About Us" component={Link} to="/about" value="/about" disabled={true}/>
                    {/*<Tab label="Map" component={Link} to="/map" value="/map" disabled={true}/>*/}
                    <Tab label="Request Feed" component={Link} to="/feed" value="/feed"/>
                    <Tab label="My Requests" component={Link} to="/my-requests" value="/my-requests"/>
                    {
                        loggedIn ? (
                            <Tab label="Profile" component={Link} to="/profile" value="/profile"/>
                        ) : (
                            <Tab label="Login" component={Link} to="/login" value="/login"/>
                        )
                    }
                </Tabs>
            </AppBar>
        );
    }
}

export default withRouter(Navbar);
