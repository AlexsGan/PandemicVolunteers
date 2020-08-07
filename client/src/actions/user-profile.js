// import { validateInput as validateBasicUserInfo } from "./register";

export function getAge(birthday) {
    const birthDate = new Date(
        birthday.getFullYear(),
        birthday.getMonth() - 1,
        birthday.getDate());
    const today = new Date();
    let yearDiff = today.getYear() - birthDate.getYear();
    if (birthDate.getMonth() > today.getMonth() ||
        (birthDate.getMonth() === today.getMonth() && birthDate.getDay() > today.getDay())) {
        return yearDiff - 1;
    }
    return yearDiff;
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

export const handleExpansion = (event, isExpanded, name, form) => {
    const target = event.target;
    // Prevent switching between categories when editing
    if (!getEditStatus(name, form)) {
        form.setState({
            contentToExpand: (isExpanded ? name : false)
        });
    }
}

export const handleSwitch = (event, form) => {
    const target = event.target;
    updateUserProfile(form, target.name, target.checked);
}

export const handleTextChange = (event, form) => {
    const target = event.target;
    if (target.name === "liftingAbility") {
        processLiftingAbility(target, form);
    } else if (target.name === "employment") {
        processEmployment(target, form);
    } else if (target.name === "biography") {
        processBiography(target, form);
    } else {
        // Basic user info change
        updateUserObject(form, target.name, target.value);
    }
}

export const handleQualTextChange = (event, form) => {
    const state = form.state;
    const target = event.target;
    const listIndex = parseInt(target.name);
    const newAdditionalQuals = [...state.editableUserObject.profile.additionalQuals];
    if (target.value === "") {
        newAdditionalQuals.splice(listIndex, 1);
    } else {
        newAdditionalQuals[listIndex] = target.value
    }
    updateUserProfile(form, "additionalQuals", newAdditionalQuals);
}

export const handleAddQual = (event, form) => {
    const state = form.state;
    updateUserProfile(form, "additionalQuals",
        [...state.editableUserObject.profile.additionalQuals, ""]);
}

export const handleEdit = (event, content, form) => {
    form.setState(prevState =>
        ({
            editContent: {
                doEdit: true,
                content: content
            },
            editableUserObject: {
                ...form.props.userObject,
                password: ""
            }
        })
    );
}

export const handleSaveEdit = (event, body) => {
    const app = body.props.app;
    // Remove extraneous/empty qualifications and add to user object
    const editedQuals = processAdditionalQuals(body);
    let basicInfoIsValid = true;
    if (event.currentTarget.name === "basic") {
        // FIXME: Use server validation
        basicInfoIsValid = true;
        // basicInfoIsValid = validateBasicUserInfo(body.state.editableUserObject, body);
    }
    app.setState(prevState => (
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
                        additionalQuals: editedQuals
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
    );
}

export const handleCancel = (event, form) => {
    form.setState(prevState =>
        ({
            editContent: {
                doEdit: false,
                content: "",
            },
            editableUserObject: {
                ...form.props.userObject
            },
        })
    );
}

export const getEditStatus = (name, form) => {
    return form.state.editContent.doEdit && form.state.editContent.content === name;
}

const processLiftingAbility = (target, form) => {
    if (target.value === "" || target.value.match(/^0+$/)) {
        target.value = "0";
        updateUserProfile(form, target.name, parseInt(target.value));
        updateUserProfile(form, "isLifter", false);
    } else if (target.value.match(/^\d+$/)) {
        updateUserProfile(form, target.name, parseInt(target.value));
        updateUserProfile(form, "isLifter", true);
    }
}

const processEmployment = (target, form) => {
    if (target.value === "") {
        updateUserProfile(form, "isEmployed", false);
    }
    updateUserProfile(form, target.name, target.value);
}

const processBiography = (target, form) => {
    if (target.value === "") {
        updateUserProfile(form, "hasBiography", false);
    } else {
        updateUserProfile(form, "hasBiography", true);
    }
    updateUserProfile(form, target.name, target.value);
}

const processAdditionalQuals = (form) => {
    const additionalQuals = [...form.state.editableUserObject.profile.additionalQuals];
    const editedQuals = [];
    for (let i = 0; i < additionalQuals.length; i++) {
        if (additionalQuals[i].trim() !== "") {
            editedQuals.push(additionalQuals[i].trim());
        }
    }
    return editedQuals;
}

const updateUserProfile = (form, property, newValue) => {
    form.setState(prevState => ({
        editableUserObject: {
            ...prevState.editableUserObject,
            profile: {
                ...prevState.editableUserObject.profile,
                [property]: newValue
            }
        }
    }));
}

const updateUserObject = (form, property, newValue) => {
    form.setState(prevState => ({
        editableUserObject: {
            ...prevState.editableUserObject,
            [property]: newValue
        }
    }));
}