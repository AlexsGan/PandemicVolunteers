export const handleChange = (event, form) => {
    const target = event.target;
    form.setState({
        [target.name]: target.value
    });
}

export const handleSubmit = (event, form) => {
    if (validateInput(form.state, form)) {
        // BACKEND: Send user info to server
        form.setState({slideIn: false, slideDirection: "left"},
                        () => {form.setState({redirect: true});});
    }
}

export const validateInput = (state, registerForm) => {
    let validInput = true;
    if (state.firstName.match(/^\S+$/) === null) {
        registerForm.setState({firstNameError: true});
        validInput = false;
    } else {
        registerForm.setState({firstNameError: false});
    }
    if (state.lastName.match(/^\S+$/) === null) {
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
    if (state.birthday === "" || !isOfAge(state.birthday)) {
        registerForm.setState({birthdayError: true});
        validInput = false;
    } else {
        registerForm.setState({birthdayError: false});
    }
    return validInput;
}

const isOfAge = dateStr => {
    let dateArr = dateStr.split("-");
    const today = new Date();
    const adjustedBirthday = new Date(parseInt(dateArr[0]) + 18, parseInt(dateArr[1])-1, parseInt(dateArr[2]));
    return adjustedBirthday <= today;
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