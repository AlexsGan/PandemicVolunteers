import React from "react";
import "./styles.css";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import { Typography, Grid, Paper, Button, Container } from "@material-ui/core";
import ProfileStepper from "../ProfileStepper";
import { handleBack, handleNext, getSteps, getWizardContent } from "../../../actions/profile-wizard"
import { Redirect } from "react-router-dom";

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
        hasLiftAbility: false,
        liftField: "",
        hasShoppingAbility: false,
        hasBiography: false,
        biographyField: "",
        hasVisibleProfile: false,
        hasVulnerable: false,
        additionalQuals: [],
        employmentFieldError: false,
        liftFieldError: false,
        cityError: false,
        provinceError: false,
        stepSubmitted: false,
        finished: false,
        userObject: {}
    }

    render() {
        if (this.state.finished) {
            return <Redirect to={{
                pathname: "/profile",
                state: { userObject: this.state.userObject }
            }}/>;
        }

        return (
            <Slide direction={this.state.slideDirection} in={this.state.slideIn} mountOnEnter unmountOnExit>
                <Box>
                    <Box className="header">
                        <Typography variant="h3" align="center">
                            Tell us about yourself!
                        </Typography>
                    </Box>
                    <Container className="wizard-container" maxWidth="md">
                        <Grid className="wizard-grid" container spacing={2}>
                            <Grid item xs={12}>
                                <Paper className="wizard-grid__content" elevation={2}>
                                    {getWizardContent(this.state.activeStep, this)}
                                </Paper>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={this.state.activeStep === 0}
                                    onClick={(event) => {
                                        handleBack(event, this)
                                    }}
                                    fullWidth
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={8}>
                                <ProfileStepper
                                    activeStep={this.state.activeStep}
                                    steps={getSteps()}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => {
                                        handleNext(event, this)
                                    }}
                                    fullWidth
                                >
                                    {this.state.activeStep === getSteps().length - 1 ? 'Finish' : 'Next'}
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