import React from "react";
import { Redirect } from "react-router-dom"
import { logout } from "../../actions/user"

/* Logs out user and redirects to homepage */
class Logout extends React.Component {
    constructor(props) {
        super(props)
        // If logged in
        if (props.app.state.currentUser) {
            logout(props.app)
                .catch(() => {
                    console.error("Logout Failed")
                });
        }
    }

    render() {
        const loggedIn = !!this.props.app.state.currentUser;
        return (
            loggedIn ? (
                <Redirect to="/home"/>
            ) : null
        );
    }
}

export default Logout;
