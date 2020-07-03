import React from "react";
import { handleTextChange, handleSubmit } from "../../actions/login";
import { Typography, Container, Slide, Box } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./styles.css";

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        credentialError: false,
        loginSuccess: false,
        redirectToRegister: false,
        slideDirection: "right",
        slideIn: true
    }

    checkLogin() {
        if (this.state.loginSuccess) {
            return <Redirect to={{
                pathname: "/profile",
                state: { userObject: this.state.userObject }
            }}/>;
        }
    }

    render() {
        this.checkLogin();

        return (
            <Slide direction={this.state.slideDirection} in={this.state.slideIn} mountOnEnter unmountOnExit>
                <Box>
                    <Typography className="header" variant="h2" align="center">
                        Login
                    </Typography>
                    <Container className="login__form" maxWidth="xs">
                        <LoginForm 
                            username={this.state.username}
                            password={this.state.password}
                            credentialError={this.state.credentialError}
                            handleTextChange={(event) => handleTextChange(event, this)}
                            handleSubmit={(event) => handleSubmit(event, this)}
                        />
                    </Container>
                </Box>
            </Slide>
        )
    }
}

export default Login;