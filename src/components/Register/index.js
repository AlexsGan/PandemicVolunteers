import React, { Fragment } from "react";
import RegisterForm from "../RegisterForm";
import "./styles.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { validateInput } from "../../actions/register";

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
    passwordError: false
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
    } else {
      console.log("Invalid chars");
    }
  }

  render() {
    return (
      <Fragment>
        <div className="header">
          <Typography variant="h2" align="center">
          Let's setup your account.
          </Typography>
        </div>
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
      </Fragment>
    );
  }
}

export default Register;
