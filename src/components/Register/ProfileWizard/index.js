import React from "react";
import "./styles.css";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import { Typography, Grid, Paper, Button, Container } from "@material-ui/core";
import ProfileStepper from "../ProfileStepper";
import StepLocation from "../ProfileStepper/location-step";
import QualificationStep from "../ProfileStepper/qualification-step";

/* Component for profile wizard page */
class ProfileWizard extends React.Component {
    state = {
        slideIn: true,
        slideDirection: "right",
        activeStep: 0,
        city: "",
        province: "",
        hasEmployment: false,
        hasRemoteWork: false,
        employmentField: "",
        hasVehicle: false,
        submitted: false
    }

    getSteps() {
        return ['Location', 'Qualifications'];
    }

    getWizardContent (step) {
        switch(step) {
            case 0:
                return (<StepLocation
                            city={this.state.city}
                            province={this.state.province}
                            handleChange={this.handleChange}
                            submitted={this.state.submitted}
                        />)
            case 1:
                return (<QualificationStep
                            hasEmployment={this.state.hasEmployment}
                            hasRemoteWork={this.state.hasRemoteWork}
                            employmentField={this.state.employmentField}
                            hasVehicle={this.state.hasVehicle}
                            handleChange={this.handleChange}
                            handleSwitch={this.handleSwitch}
                            submitted={this.state.submitted}
                        />)
            default:
                return ('Error');
        }
    }

    handleChange = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSwitch = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.checked
        });
    }

    handleBack = event => {
        this.setState({activeStep: this.state.activeStep - 1});
    }

    handleNext = event => {
        if (this.state.activeStep === this.getSteps().length - 1) {
            this.handleSubmit(this.state);
        } else {
            this.setState({submitted: true}, () => {
                this.setState(
                    {activeStep: this.state.activeStep + 1, submitted: false}
                );
            });
        }
    }

    handleSubmit = state => {
        // BACKEND: Push user profile information to server
        console.log("Profile submitted");
        return null;
    }

    render () {
        return (
            <Slide direction={this.state.slideDirection} in={this.state.slideIn} mountOnEnter unmountOnExit>
                <Box>
                    <Box className="header">
                        <Typography variant="h3"  align="center">
                            Tell us about yourself!
                        </Typography>
                    </Box>
                    <Container className = "wizard-container" maxWidth="md">
                        <Grid className="wizard-grid" container spacing={2}>
                            <Grid item xs={12}>
                                <Paper className="wizard-grid__content" elevation={2}>
                                    {this.getWizardContent(this.state.activeStep)}
                                </Paper>
                            </Grid>
                            <Grid item xs={2}>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                    fullWidth
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <ProfileStepper
                                    activeStep={this.state.activeStep}
                                    steps={this.getSteps()}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    fullWidth
                                >
                                    {this.state.activeStep === this.getSteps().length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Slide>
        );
    }
}
export default ProfileWizard;