import React from "react";
import LocationStep from "../components/Register/ProfileStepper/LocationStep";
import QualificationStep from "../components/Register/ProfileStepper/QualificationStep";
import PreferenceStep from "../components/Register/ProfileStepper/PreferenceStep";

export function getSteps() {
    return ['Location', 'Qualifications', 'Preferences'];
}

export const handleBack = (event, wizard) => {
    const state = wizard.state;
    wizard.setState({ activeStep: state.activeStep - 1 });
}

export const handleNext = (event, wizard) => {
    const state = wizard.state;
    if (state.activeStep === getSteps().length - 1) {
        wizard.setState(
            {
                stepSubmitted: true,
                slideIn: false,
                slideDirection: "left"
            },
            () => {
                // Wait for transition to complete
                setTimeout(() => {handleSubmit(wizard);}, 500);
            }
        );
    } else {
        if (handleValidate(state.activeStep, wizard)) {
            wizard.setState({ stepSubmitted: true }, () => {
                wizard.setState(
                    { activeStep: state.activeStep + 1, stepSubmitted: false }
                );
            });
        }
    }
}

const handleSubmit = (wizard) => {
    const state = wizard.state;
    // State passed from Register component
    const basicUser = wizard.props.location.state.basicUser;
    // FIXME: Temporary phase 1 user object
    const userObject = {
        isAdmin: false,
        firstName: basicUser.firstName,
        lastName: basicUser.lastName,
        username: basicUser.username,
        password: basicUser.password,
        birthday: basicUser.birthday,
        requestsAccepted: 0,
        requestsSent: 0,
        requestsCompleted: 0,
        profile: {
            location: { city: state.city, province: state.province },
            isEmployed: state.hasEmployment,
            isWorkingRemotely: state.hasRemoteWork,
            employment: state.employmentField.trim(),
            isDriver: state.hasVehicle,
            isLifter: state.hasLiftAbility,
            liftingAbility: parseInt(state.liftField.trim()),
            isShopper: state.hasShoppingAbility,
            hasBiography: state.hasBiography,
            biography: state.biographyField.trim(),
            hasVisibleProfile: state.hasVisibleProfile,
            isVulnerable: state.hasVulnerable,
            additionalQuals: []
        }
    }
    // Remove extraneous/empty qualifications and add to user object
    for (let i = 0; i < state.additionalQuals.length; i++) {
        if (state.additionalQuals[i].trim() !== "") {
            userObject.profile.additionalQuals.push(state.additionalQuals[i].trim());
        }
    }

    // BACKEND: Send user profile information to server
    console.log("Profile submitted");
    console.log(userObject);
    wizard.setState({ userObject: userObject, finished: true });
}

const handleValidate = (step, wizard) => {
    switch (step) {
        case 0:
            return validateLocation(wizard);
        case 1:
            return validateQualification(wizard);
        default:
            return true;
    }
}

export const getWizardContent = (step, wizard) => {
    const state = wizard.state;
    switch (step) {
        case 0:
            return (<LocationStep
                header="Your Current Location"
                description="Used to retrieve news and volunteer requests near you."
                city={state.city}
                province={state.province}
                cityError={state.cityError}
                provinceError={state.provinceError}
                handleChange={(event) => { handleTextChange(event, wizard) }}
                stepSubmitted={state.stepSubmitted}
            />)
        case 1:
            return (<QualificationStep
                header="Your Qualifications"
                description="Used to recommend and filter volunteer requests."
                hasEmployment={state.hasEmployment}
                hasRemoteWork={state.hasRemoteWork}
                employmentField={state.employmentField}
                hasVehicle={state.hasVehicle}
                hasLiftAbility={state.hasLiftAbility}
                liftField={state.liftField}
                hasShoppingAbility={state.hasShoppingAbility}
                employmentFieldError={state.employmentFieldError}
                liftFieldError={state.liftFieldError}
                handleChange={(event) => { handleTextChange(event, wizard) }}
                handleSwitch={(event) => { handleSwitch(event, wizard) }}
                stepSubmitted={state.stepSubmitted}
            />)
        case 2:
            return (<PreferenceStep
                header="Preferences &amp; Additional Info"
                description="Extra information used toward to your personal profile."
                hasVisibleProfile={state.hasVisibleProfile}
                hasVulnerable={state.hasVulnerable}
                additionalQuals={state.additionalQuals}
                hasBiography={state.hasBiography}
                biographyField={state.biographyField}
                handleSwitch={(event) => { handleSwitch(event, wizard) }}
                handleTextChange={(event) => { handleTextChange(event, wizard) }}
                handleAdd={(event) => { handleAdd(event, wizard) }}
                handleQualTextChange={(event) => { handleQualTextChange(event, wizard) }}
                handleChange={(event) => { handleTextChange(event, wizard) }}
                stepSubmitted={state.stepSubmitted}
            />)
        default:
            alert("Invalid wizard step.");
            return ("Error");
    }
}

const handleTextChange = (event, wizard) => {
    const target = event.target;
    wizard.setState({
        [target.name]: target.value
    });
}

const handleQualTextChange = (event, wizard) => {
    const state = wizard.state;
    const target = event.target;
    const newAdditionalQuals = [...state.additionalQuals];
    newAdditionalQuals[parseInt(target.name)] = target.value
    wizard.setState({ additionalQuals: newAdditionalQuals });
}

const handleSwitch = (event, wizard) => {
    const target = event.target;
    wizard.setState({
        [target.name]: target.checked
    });
}

const handleAdd = (event, wizard) => {
    const state = wizard.state;
    wizard.setState({ additionalQuals: [...state.additionalQuals, ""] });
}

const validateQualification = wizard => {
    const state = wizard.state;
    let isValid = true;
    if (state.hasEmployment) {
        if (state.employmentField.trim() === "") {
            isValid = false;
            wizard.setState({ employmentFieldError: true });
        } else {
            wizard.setState({ employmentFieldError: false });
        }
    }
    if (state.hasLiftAbility) {
        if (state.liftField.trim() === "" ||
            state.liftField.trim().match(/^0+/) ||
            !state.liftField.trim().match(/^\d+$/)) {
            isValid = false;
            wizard.setState({ liftFieldError: true });
        } else {
            wizard.setState({ liftFieldError: false });
        }
    }
    return isValid;
}

const validateLocation = wizard => {
    const state = wizard.state;
    let isValid = true;
    if (state.city === "") {
        isValid = false;
        wizard.setState({ cityError: true });
    } else {
        wizard.setState({ cityError: false });
    }
    if (state.province === "") {
        isValid = false;
        wizard.setState({ provinceError: true });
    } else {
        wizard.setState({ provinceError: false });
    }
    return isValid;
}