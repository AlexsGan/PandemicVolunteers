import { registerUser } from "./user";

export const handleChange = (event, form) => {
    const target = event.target;
    form.setState({
        [target.name]: target.value
    });
}

export const handleSubmit = (event, form) => {
    const state = form.state;
    if (validateInput(form.state, form)) {
        // BACKEND: Send user info to server
        const userObject = {
            username: state.username,
            password: state.password,
            firstName: state.firstName,
            lastName: state.lastName,
            birthday: state.birthday,
            isAdmin: false,
        }
        registerUser(userObject)
            .then(() => {
                // Trigger redirect to login
                form.setState({ slideIn: false, slideDirection: "left" },
                    () => {
                        form.setState({ redirect: true });
                    });
            })
            .catch((err) => {
                if (err && err.validationError) {
                    // Any validation errors should have been caught by the client's input validation
                    console.error('Database validation errors were not caught by client:');
                    const errorStateToSet = {};
                    const acceptedErrors = ['firstName', 'lastName', 'username', 'password', 'birthday'];
                    for (const error of err) {
                        if (!acceptedErrors.includes(error.type)) {
                            form.setState({serverError: 'Internal Server Error occurred, try again.'});
                            break;
                        }
                        errorStateToSet[`${error.type}Error`] = error.message;
                    }
                    form.setState(errorStateToSet);

                } else if (err === 'exists') {
                    // Username already exists
                    form.setState({ usernameError: 'Username already exists.' });
                } else {
                    console.error(err);
                    form.setState({serverError: 'Internal Server Error occurred, try again.'});
                }
            })

    }
}

export const validateInput = (state, registerForm) => {
    let validInput = true;
    if (state.firstName.trim().length === 0) {
        registerForm.setState({ firstNameError: 'Missing first name.' });
        validInput = false;
    } else {
        registerForm.setState({ firstNameError: '' });
    }
    if (state.lastName.trim().length === 0) {
        registerForm.setState({ lastNameError: 'Missing last name.' });
        validInput = false;
    } else {
        registerForm.setState({ lastNameError: '' });
    }
    if (!state.username.match(/^\w+$/)) {
        registerForm.setState({ usernameError: 'Username can only contain alphanumerics and underscores.' });
        validInput = false;
    } else {
        registerForm.setState({ usernameError: '' });
    }
    if (!state.password.match(/^\S+$/)) {
        registerForm.setState({ passwordError: 'Password cannot contain spaces.' });
        validInput = false;
    } else {
        registerForm.setState({ passwordError: '' });
    }
    if (state.birthday === "" || !isOfAge(state.birthday)) {
        registerForm.setState({ birthdayError: 'You must be 18 years or older.' });
        validInput = false;
    } else {
        registerForm.setState({ birthdayError: '' });
    }
    return validInput;
}

const isOfAge = dateStr => {
    let dateArr = dateStr.split("-");
    const today = new Date();
    const adjustedBirthday = new Date(parseInt(dateArr[0]) + 18, parseInt(dateArr[1]) - 1, parseInt(dateArr[2]));
    return adjustedBirthday <= today;
}