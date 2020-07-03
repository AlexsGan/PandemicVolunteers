export function getAge(birthday) {
    let dateArr = birthday.split("-");
    const birthDate = new Date(
        parseInt(dateArr[0]),
        parseInt(dateArr[1])-1,
        parseInt(dateArr[2]));
    const today = new Date();
    let yearDiff = today.getYear() - birthDate.getYear();
    if (birthDate.getMonth() > today.getMonth() &&
        birthDate.getDay() > today.getDay()) {
        return yearDiff - 1;
    }
    return yearDiff;
}

export const handleExpansion = (event, isExpanded, name, form) => {
    const target = event.target;
    // Prevent switching between categories when editing
    if (!form.state.editContent.doEdit) {
        form.setState({
            contentToExpand: (isExpanded ? name : false)
        });
    }
}

export const handleSwitch = (event, form) => {
    const target = event.target;
    updateUserProperty(form, target.name, target.checked);
}

export const handleTextChange = (event, form) => {
    const target = event.target;
    if (target.name === "liftingAbility") {
        processLiftingAbility(target, form);
    } else if (target.name === "employment") {
        processEmployment(target, form);
    } else if (target.name === "biography") {
        processBiography(target, form);
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
    updateUserProperty(form, "additionalQuals", newAdditionalQuals);
}

export const handleAddQual = (event, form) => {
    const state = form.state;
    updateUserProperty(form, "additionalQuals",
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
                ...form.state.userObject
            }
        })
    );
}

export const handleSaveEdit = (event, form) => {
    // Remove extraneous/empty qualifications and add to user object
    const editedQuals = processAdditionalQuals(form);
    form.setState(prevState => (
            // Update user object
            {
                editContent: {
                    doEdit: false,
                    content: ""
                },
                userObject: {
                    ...prevState.editableUserObject,
                    profile: {
                        ...prevState.editableUserObject.profile,
                        // Trim input fields
                        employment: prevState.editableUserObject.profile.employment.trim(),
                        biography: prevState.editableUserObject.profile.biography.trim(),
                        // Disable if empty
                        isEmployed: !(prevState.editableUserObject.profile.employment.trim() === ""),
                        hasBiography: !(prevState.editableUserObject.profile.biography.trim() === ""),
                        additionalQuals: editedQuals
                    }
                }
            }
        ),
        () => {
            form.setState(prevState => (
                    // Update editable object
                    {
                        editableUserObject: prevState.userObject                    
                    }
                )
            );
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
                ...prevState.userObject
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
        updateUserProperty(form, target.name, parseInt(target.value));
        updateUserProperty(form, "isLifter", false);
    }
    else if (target.value.match(/^\d+$/)) {
        updateUserProperty(form, target.name, parseInt(target.value));
        updateUserProperty(form, "isLifter", true);
    }
}

const processEmployment = (target, form) => {
    if (target.value === "") {
        updateUserProperty(form, "isEmployed", false);
    }
    updateUserProperty(form, target.name, target.value);
}

const processBiography = (target, form) => {
    if (target.value === "") {
        updateUserProperty(form, "hasBiography", false);
    } else {
        updateUserProperty(form, "hasBiography", true);
    }
    updateUserProperty(form, target.name, target.value);
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

const updateUserProperty = (form, property, newValue) => {
    form.setState(prevState =>({
        editableUserObject : {
            ...prevState.editableUserObject,
            profile: {
                ...prevState.editableUserObject.profile,
                [property]: newValue
            }
        }
    }));
}