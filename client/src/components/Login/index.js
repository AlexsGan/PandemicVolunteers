import React from "react";
import { Typography, Container } from "@material-ui/core";
import { handleRedirect } from "../../actions/login";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./styles.css";

// import Navbar from "../Navbar";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.app = this.props.app;
    }

    state = {
        loginSuccess: false
    }

    render() {
        if (this.state.loginSuccess) {
            return <Redirect to={{ pathname: "/register/create-profile" }}/>;
        }

        return (
            <>
                {/*<Navbar
                    userObject={null}
                    currentPath={"/login"}
                />*/}
                <Typography className="header" variant="h2" align="center">
                    Login
                </Typography>
                <Container className="login__form" maxWidth="xs">
                    <LoginForm
                        app={this.app}
                        handleRedirect={(e) => handleRedirect(this)}
                    />
                </Container>
            </>
        )
    }
}

export default Login;