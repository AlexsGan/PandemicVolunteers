import React from "react";
import LocationStep from "../components/ProfileWizard/ProfileStepper/LocationStep";
import QualificationStep from "../components/ProfileWizard/ProfileStepper/QualificationStep";
import PreferenceStep from "../components/ProfileWizard/ProfileStepper/PreferenceStep";
import { checkCookie, registerProfile } from "./user";

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
                setTimeout(() => {
                    handleSubmit(wizard);
                }, 500);
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

const newProfileFromState = (state) => {
    const profile = {
        isVisible: state.isVisible,
        city: state.city,
        province: state.province,
        isEmployed: state.hasEmployment,
        isWorkingRemotely: state.hasRemoteWork,
        isDriver: state.hasVehicle,
        isLifter: state.hasLiftAbility,
        isShopper: state.hasShoppingAbility,
        isVulnerable: state.hasVulnerable,
        hasBiography: state.hasBiography,
        employment: state.employmentField.trim(),
        liftingAbility: parseInt(state.liftField.trim()),
        biography: state.biographyField.trim(),
        customQualifications: []
    }
    // Remove extraneous/empty qualifications and add to user object
    for (let i = 0; i < state.additionalQuals.length; i++) {
        if (state.additionalQuals[i].trim() !== "") {
            profile.customQualifications.push(state.additionalQuals[i].trim());
        }
    }
    return profile;
}

const handleSubmit = (wizard) => {
    const app = wizard.props.app;
    const state = wizard.state;
    const profile = newProfileFromState(state);
    // BACKEND: Send user profile information to server
    registerProfile(app.state.currentUser.username, profile)
        .then((res) => {
            // Trigger finish dialog
            wizard.setState({ finished: true });
        })
        .catch((err) => {
            if (err && err.validationError) {
                wizard.setState({ rejectProfile: true, rejectErrors: err.validationError });
            } else if (err === 'unauthorized') {
                // Session expired, trigger re-login and dialog
                wizard.setState({ finished: true, authFailed: true });
            } else {
                wizard.setState({ rejectProfile: true, rejectErrors: [err] });
            }
        });
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
                handleChange={(event) => {
                    handleTextChange(event, wizard)
                }}
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
                handleChange={(event) => {
                    handleTextChange(event, wizard)
                }}
                handleSwitch={(event) => {
                    handleSwitch(event, wizard)
                }}
                stepSubmitted={state.stepSubmitted}
            />)
        case 2:
            return (<PreferenceStep
                header="Preferences &amp; Additional Info"
                description="Extra information used toward to your personal profile."
                isVisible={state.isVisible}
                hasVulnerable={state.hasVulnerable}
                additionalQuals={state.additionalQuals}
                hasBiography={state.hasBiography}
                biographyField={state.biographyField}
                handleSwitch={(event) => {
                    handleSwitch(event, wizard)
                }}
                handleTextChange={(event) => {
                    handleTextChange(event, wizard)
                }}
                handleAdd={(event) => {
                    handleAdd(event, wizard)
                }}
                handleQualTextChange={(event) => {
                    handleQualTextChange(event, wizard)
                }}
                handleChange={(event) => {
                    handleTextChange(event, wizard)
                }}
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