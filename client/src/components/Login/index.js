import React from "react";
import { Typography, Container } from "@material-ui/core";
import { handleRedirect } from "../../actions/login";
import LoginForm from "./LoginForm";
import "./styles.css";

// import Navbar from "../Navbar";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.app = this.props.app;
    }

    render() {
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
                    />
                </Container>
            </>
        )
    }
}

export default Login;