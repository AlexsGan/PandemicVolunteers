import React from "react";
import RegisterForm from "./RegisterForm";

import "./styles.css";
import { Container, Typography, Slide, Box } from "@material-ui/core";
import { validateInput } from "../../actions/register";
import { Redirect } from "react-router";

/* Component for register page */
class Register extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        firstNameError: false,
        lastNameError: false,
        usernameError: false,
        passwordError: false,
        slideIn: true,
        slideDirection: "right",
        redirect: false
    };

    handleChange = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit = event => {
        if (validateInput(this)) {
            // BACKEND: Send user info to server
            console.log("VALID");
            this.setState({slideIn: false, slideDirection: "left"});
            setTimeout(() => {this.setState({redirect: true})}, 500);
        } else {
            console.log("Invalid chars");
        }
    }

    render() {
        // Redirect to profile creation component
        if (this.state.redirect) {
            return <Redirect to="/register/create-profile"/>;
        }
        return (
            <Slide direction={this.state.slideDirection} in={this.state.slideIn} mountOnEnter unmountOnExit>
                <Box>
                    <Box className="header">
                        <Typography variant="h2" align="center">
                            Let's setup your account.
                        </Typography>
                    </Box>
                    <Container className="register-form" maxWidth="xs">
                        <RegisterForm
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            username={this.state.username}
                            password={this.state.password}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            firstNameError={this.state.firstNameError}
                            lastNameError={this.state.lastNameError}
                            usernameError={this.state.usernameError}
                            passwordError={this.state.passwordError}
                        />
                    </Container>
                </Box>
            </Slide>
        );
    }
}

export default Register;
