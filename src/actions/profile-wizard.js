import React from "react";
import StepLocation from "../components/Register/ProfileStepper/location-step";
import QualificationStep from "../components/Register/ProfileStepper/qualification-step";

export function getSteps() {
    return ['Location', 'Qualifications'];
}

export const getWizardContent = (step, wizard) => {
    switch(step) {
        case 0:
            return (<StepLocation
                        city={wizard.state.city}
                        province={wizard.state.province}
                        handleChange={(event) => {handleChange(event, wizard)}}
                        submitted={wizard.state.submitted}
                    />)
        case 1:
            return (<QualificationStep
                        hasEmployment={wizard.state.hasEmployment}
                        hasRemoteWork={wizard.state.hasRemoteWork}
                        employmentField={wizard.state.employmentField}
                        hasVehicle={wizard.state.hasVehicle}
                        handleChange={(event) => {handleChange(event, wizard)}}
                        handleSwitch={(event) => {handleSwitch(event, wizard)}}
                        submitted={wizard.state.submitted}
                    />)
        default:
            return ('Error');
    }
}

export const handleChange = (event, wizard) => {
    const target = event.target;
    wizard.setState({
        [target.name]: target.value
    });
}

export const handleSwitch = (event, wizard) => {
    const target = event.target;
    wizard.setState({
        [target.name]: target.checked
    });
}

export const handleBack = (event, wizard) => {
    wizard.setState({activeStep: wizard.state.activeStep - 1});
}

export const handleNext = (event, wizard) => {
    if (wizard.state.activeStep === getSteps().length - 1) {
        handleSubmit(wizard.state);
    } else {
        wizard.setState({submitted: true}, () => {
            wizard.setState(
                {activeStep: wizard.state.activeStep + 1, submitted: false}
            );
        });
    }
}

export const handleSubmit = wizard => {
    // BACKEND: Push user profile information to server
    console.log("Profile submitted");
    return null;
}