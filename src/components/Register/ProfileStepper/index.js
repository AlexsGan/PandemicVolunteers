import React from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import "./styles.css";

/* Component for profile wizard stepper */
class ProfileStepper extends React.Component {
    state = {
    }
    render () {
        const {
            activeStep,
            steps
        } = this.props;

        return (
            <Stepper activeStep = {activeStep}>
                <Step key={1}>
                    <StepLabel>{steps[0]} </StepLabel>
                </Step>
                <Step key={2}>
                    <StepLabel>{steps[1]}</StepLabel>
                </Step>
            </Stepper>
        );
    }
}
export default ProfileStepper;