export const validateInput = registerForm => {
    let validInput = true;
    const state = registerForm.state;
    if (state.firstName.match(/^[a-zA-Z]+$/) === null) {
        registerForm.setState({firstNameError: true});
        validInput = false;
    } else {
        registerForm.setState({firstNameError: false});
    }
    if (state.lastName.match(/^[a-zA-Z]+$/) === null) {
        registerForm.setState({lastNameError: true});
        validInput = false;
    } else {
        registerForm.setState({lastNameError: false});
    }
    if (validateUsername(state.username) === false) {
        registerForm.setState({usernameError: true});
        validInput = false;
    } else {
        registerForm.setState({usernameError: false});
    }
    if (state.password.match(/^\S+$/) === null) {
        registerForm.setState({passwordError: true});
        validInput = false;
    } else {
        registerForm.setState({passwordError: false});
    }
    return validInput;
}
const validateUsername = username => {
    if (username.match(/^\w+$/) === null) {
        return false;
    }
    // BACKEND:
    // else if (*SERVER CALL TO CHECK IF USERNAME EXISTS) {
    //  return false;
    // }
    return true;
}