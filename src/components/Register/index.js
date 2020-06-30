import React from "react";
import RegisterForm from "./RegisterForm";

import "./styles.css";
import { Container, Typography, Slide, Box } from "@material-ui/core";
import { Redirect } from "react-router";
import { handleChange, handleSubmit } from "../../actions/register";

/* Component for register page */
class Register extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        birthday: "",
        firstNameError: false,
        lastNameError: false,
        usernameError: false,
        passwordError: false,
        birthdayError: false,
        slideIn: true,
        slideDirection: "right",
        redirect: false
    };

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
                            birthday={this.state.birthday}
                            firstNameError={this.state.firstNameError}
                            lastNameError={this.state.lastNameError}
                            usernameError={this.state.usernameError}
                            passwordError={this.state.passwordError}
                            birthdayError={this.state.birthdayError}
                            handleChange={(event) => handleChange(event, this)}
                            handleSubmit={(event) => handleSubmit(event, this)}
                        />
                    </Container>
                </Box>
            </Slide>
        );
    }
}

export default Register;
