import React from "react";
import { Typography, Tabs, AppBar, Tab } from "@material-ui/core"
import { Redirect } from "react-router-dom"
import "./styles.css";

/* Navigation Bar Component for Landing page */
class Navbar extends React.Component {
    state = {
        redirectPath: this.props.currentPath,
    }

    handleClick = (event, newValue) => {
        this.setState({redirectPath: newValue});
        console.log(newValue)
    }

    render() {
        const {
            currentPath
        } = this.props;

        // Handle redirects
        if (this.state.redirectPath !== currentPath) {
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
            <AppBar position="static">
                <Tabs
                    className="navbar__tabs"
                    value={this.state.redirectPath}
                    onChange={this.handleClick}
                    centered
                >
                    <Tab label="Home" value="/"/>
                    <Tab label="Requests" value="/requests"/>
                    <Tab label="Group Chats" value="/group-chat"/>
                    <Tab label="About Us" value="/about" disabled={true}/>
                    { 
                        this.props.userObject !== null ? (
                            <Tab label="Profile" value="/profile"/>
                        ) : (
                            <Tab label="Login" value="/login"/>
                        )
                    }
                </Tabs>
            </AppBar>
        );
    }
}

export default Navbar;
