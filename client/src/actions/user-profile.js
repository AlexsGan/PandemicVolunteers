// import { validateInput as validateBasicUserInfo } from "./register";
import { updateUser, updateProfile } from "./user";

export function getAge(birthdayString) {
    const birthDate = new Date(birthdayString);
    const today = new Date();
    let yearDiff = today.getYear() - birthDate.getYear();
    if (birthDate.getMonth() > today.getMonth() ||
        (birthDate.getMonth() === today.getMonth() && birthDate.getDay() > today.getDay())) {
        return yearDiff - 1;
    }
    return yearDiff;
}

export function getFormattedBirthday(birthdayString) {
    const result = birthdayString.split('T')[0];
    return result;
}

export function getRequests(type) {
    switch (type) {
        // BACKEND: Pull accepted, sent, and completed request counts from server
        case "accepted":
            return 0
        case "sent":
            return 0
        case "completed":
            return 0
        default:
            alert("Invalid request type");
            return -1;
    }
}

export const handleExpansion = (event, isExpanded, name, body) => {
    const target = event.target;
    // Prevent switching between categories when editing
    if (!getEditStatus(name, body)) {
        body.setState({
            contentToExpand: (isExpanded ? name : false)
        });
    }
}

export const handleSwitch = (event, body) => {
    const target = event.target;
    updateUserProfile(body, target.name, target.checked);
}

export const handleTextChange = (event, body) => {
    const target = event.target;
    switch (target.name) {
        case "liftingAbility":
            processLiftingAbility(target, body);
            break;
        case "employment":
            processEmployment(target, body);
            break;
        case "biography":
            processBiography(target, body);
            break;
        case "birthday":
            processBirthday(target, body);
            break;
        default:
            updateUserObject(body, target.name, target.value);
            break;
    }
}

export const handleQualTextChange = (event, body) => {
    const state = body.state;
    const target = event.target;
    const listIndex = parseInt(target.name);
    const newCustomQualifications = [...state.editableUserObject.profile.customQualifications];
    if (target.value === "") {
        newCustomQualifications.splice(listIndex, 1);
    } else {
        newCustomQualifications[listIndex] = target.value
    }
    updateUserProfile(body, "customQualifications", newCustomQualifications);
}

export const handleAddQual = (event, body) => {
    const state = body.state;
    updateUserProfile(body, "customQualifications",
        [...state.editableUserObject.profile.customQualifications, ""]);
}

export const handleEdit = (event, content, body) => {
    body.setState(prevState =>
        ({
            editContent: {
                doEdit: true,
                content: content
            },
            editableUserObject: {
                ...body.props.userObject,
                password: ""
            }
        })
    );
}

export const handleSaveEdit = (event, body, form) => {
    const currentUser = body.props.userObject;
    const editedUser = { ...body.state.editableUserObject, profile: { ...body.state.editableUserObject.profile } };

    // Function to handle promise rejection on save
    const handleSaveError = (err) => {
        if (err) {
            if (err === 'unauthorized') {
                // Refresh session cookie
                form.app.setState({ userUpdated: true });
            } else if (err === 'exists') {
                // Warn that username exists
                body.setState({ usernameError: 'Username is already in use.' })
            } else if (err.validationError) {
                // Set error for other fields on validation error
                const errorStateToSet = {};
                const acceptedErrors = ['firstName', 'lastName', 'username', 'password', 'birthday'];
                for (const error of err.validationError) {
                    if (acceptedErrors.includes(error.type)) {
                        errorStateToSet[`${error.type}Error`] = error.message;
                    } else {
                        console.error(`Unhandled error ${error.type}: ${error.message}`);
                    }
                }
                body.setState(errorStateToSet);
            }
        }
        // Reset editable user object
        body.setState({
            editableUserObject: {
                ...currentUser,
                password: null,
                profile: {
                    ...currentUser.profile,
                    customQualifications: [...currentUser.profile.customQualifications]
                }
            }
        });
    }

    const saveUser = () => {
        // To be safe, replace the profile property of edited user with existing
        editedUser.profile = currentUser.profile;
        // Remove requests properties
        delete editedUser.requestsAccepted;
        delete editedUser.requestsCompleted;
        delete editedUser.requestsSent;
        // If password is unset, remove password property
        if (!editedUser.password) {
            delete editedUser.password;
        }
        // Update user on server
        updateUser(currentUser.username, editedUser)
            .then((user) => {
                // Save new user object state
                form.setState({ userObject: user }, () => {
                    // Reset editable user object
                    body.setState({
                        editContent: {
                            doEdit: false,
                            content: ''
                        },
                        editableUserObject: {
                            ...user,
                            password: null,
                            profile: { ...user.profile, customQualifications: [...user.profile.customQualifications] }
                        }
                    });
                });
            })
            .catch((err) => {
                handleSaveError(err);
            });
    }

    const saveProfile = () => {
        // Remove extraneous/empty qualifications and add to user object
        editedUser.profile.customQualifications = processCustomQualifications(body);
        // Update user's profile on server
        updateProfile(editedUser.username, editedUser.profile)
            .then((profile) => {
                // Save new user profile state
                const newUser = { ...currentUser, profile: profile };
                form.setState({ userObject: newUser }, () => {
                    // Reset editable user object
                    body.setState({
                        editContent: {
                            doEdit: false,
                            content: ''
                        },
                        editableUserObject: {
                            ...newUser,
                            password: null,
                            profile: { ...profile, customQualifications: [...profile.customQualifications] }
                        }
                    });
                });
            })
            .catch((err) => {
                handleSaveError(err);
            });
    }

// If editing User properties
    if (event.currentTarget.name === "basic") {
        saveUser();
    } else {
        saveProfile();
    }

    /*let userPropsToUpdate = {};
    let shouldUpdateUser = false;
    // Find User properties to update
    for (const userProp of Object.keys(currentUser)) {
        // If user object property was edited
        if (userProp !== 'profile' && currentUser[userProp] !== editedUser[userProp]) {
            // Notify that user should be updated on server
            if (!shouldUpdateUser) {
                shouldUpdateUser = true;
            }
            userPropsToUpdate[userProp] = editedUser[userProp];
        }
    }
    let profilePropsToUpdate = {};
    let shouldUpdateProfile = false;
    // Find Profile properties to update
    for (const profileProp of Object.keys(currentUser.profile)) {
        // If profile property was edited
        if (currentUser.profile[profileProp] !== editedUser.profile[profileProp]) {
            // Notify that profile should be updated on server
            if (!shouldUpdateProfile) {
                shouldUpdateProfile = true;
            }
            profilePropsToUpdate[profileProp] = editedUser.profile[profileProp];
        }
    }

    if (shouldUpdateUser) {
        updateUser
    }*/


    /*let basicInfoIsValid = true;
    if (event.currentTarget.name === "basic") {
        // FIXME: Use server validation
        basicInfoIsValid = true;
        // basicInfoIsValid = validateBasicUserInfo(body.state.editableUserObject, body);
    }
    form.setState(prevState => (
            // Update user object
            {
                userObject: {
                    ...body.state.editableUserObject,
                    // Validate basic user info input
                    firstName: basicInfoIsValid ? body.state.editableUserObject.firstName : prevState.userObject.firstName,
                    lastName: basicInfoIsValid ? body.state.editableUserObject.lastName : prevState.userObject.lastName,
                    username: basicInfoIsValid ? body.state.editableUserObject.username : prevState.userObject.username,
                    password: basicInfoIsValid ? body.state.editableUserObject.password : prevState.userObject.password,
                    birthday: basicInfoIsValid ? body.state.editableUserObject.birthday : prevState.userObject.birthday,
                    age: basicInfoIsValid ? getAge(body.state.editableUserObject.birthday) : prevState.userObject.age,
                    profile: {
                        ...body.state.editableUserObject.profile,
                        // Trim input fields
                        employment: body.state.editableUserObject.profile.employment.trim(),
                        biography: body.state.editableUserObject.profile.biography.trim(),
                        // Disable if empty
                        isEmployed: !(body.state.editableUserObject.profile.employment.trim() === ""),
                        hasBiography: !(body.state.editableUserObject.profile.biography.trim() === ""),
                        customQualifications: editedQualifications
                    }
                }
            }
        ),
        () => {
            // Update editable object
            body.setState({
                editContent: {
                    doEdit: !basicInfoIsValid,
                    content: basicInfoIsValid ? "" : "basic"
                },
                editableUserObject: {
                    ...body.props.userObject
                }
            });
        }
    );*/
}

export const handleCancel = (event, body) => {
    const userObject = body.props.userObject;
    body.setState(prevState =>
        ({
            editContent: {
                doEdit: false,
                content: "",
            },
            editableUserObject: {
                ...userObject,
                profile: {
                    ...userObject.profile,
                    customQualifications: [...userObject.profile.customQualifications]
                }
            },
        })
    );
}

export const getEditStatus = (name, body) => {
    return body.state.editContent.doEdit && body.state.editContent.content === name;
}

const processLiftingAbility = (target, body) => {
    if (target.value === "" || target.value.match(/^0+$/)) {
        target.value = "0";
        updateUserProfile(body, target.name, parseInt(target.value));
        updateUserProfile(body, "isLifter", false);
    } else if (target.value.match(/^\d+$/)) {
        updateUserProfile(body, target.name, parseInt(target.value));
        updateUserProfile(body, "isLifter", true);
    }
}

const processEmployment = (target, body) => {
    if (target.value === "") {
        updateUserProfile(body, "isEmployed", false);
    }
    updateUserProfile(body, target.name, target.value);
}

const processBiography = (target, body) => {
    if (target.value === "") {
        updateUserProfile(body, "hasBiography", false);
    } else {
        updateUserProfile(body, "hasBiography", true);
    }
    updateUserProfile(body, target.name, target.value);
}

const processCustomQualifications = (body) => {
    const customQualifications = [...body.state.editableUserObject.profile.customQualifications];
    const editedQuals = [];
    for (let i = 0; i < customQualifications.length; i++) {
        if (customQualifications[i].trim() !== "") {
            editedQuals.push(customQualifications[i].trim());
        }
    }
    return editedQuals;
}

const processBirthday = (target, body) => {
    // Stringify birthday input
    const stringifiedBirthday = new Date(target.value).toISOString();
    updateUserObject(body, 'birthday', stringifiedBirthday);
};

const updateUserProfile = (body, property, newValue) => {
    body.setState(prevState => ({
        editableUserObject: {
            ...prevState.editableUserObject,
            profile: {
                ...prevState.editableUserObject.profile,
                [property]: newValue
            }
        }
    }));
}

const updateUserObject = (body, property, newValue) => {
    body.setState(prevState => ({
        editableUserObject: {
            ...prevState.editableUserObject,
            [property]: newValue
        }
    }));
}