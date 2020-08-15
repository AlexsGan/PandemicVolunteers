import React from "react";
import "./styles.css";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import { Typography, Grid, Paper, Button, Container } from "@material-ui/core";
import ProfileStepper from "./ProfileStepper";
import { handleBack, handleNext, getSteps, getWizardContent } from "../../actions/profile-wizard"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

/* Component for profile wizard page */
class ProfileWizard extends React.Component {
    constructor(props) {
        super(props);
        this.app = this.props.app;
        this.initialState = {
            slideIn: true,
            slideDirection: "right",
            activeStep: 0,
            rejectProfile: false,
            rejectErrors: [],
            authFailed: false,
            isVisible: false,
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
            hasVulnerable: false,
            customQualifications: [],
            employmentFieldError: false,
            liftFieldError: false,
            cityError: false,
            provinceError: false,
            stepSubmitted: false,
            finished: false,
            userObject: {}
        }
        this.state = { ...this.initialState };
    }

    RedirectDialog() {
        return (
            <Dialog
                open={this.state.finished}
                onClose={() => {
                    this.app.setState({ userUpdated: true });
                }}
            >
                <DialogTitle>
                    {this.state.authFailed ? (
                        "Login Session Expired"
                    ) : (
                        "Profile Successfully Created!"
                    )}
                </DialogTitle>
                <DialogContent>
                    {this.state.authFailed ? (
                        <DialogContentText>
                            Redirecting to login page...
                        </DialogContentText>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        this.app.setState({ userUpdated: true });
                    }} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    ErrorDialog() {
        const errors = this.state.rejectErrors.map((error) => (
            <DialogContentText>
                Error: {error.message}
            </DialogContentText>
        ));
        return (
            <Dialog
                open={this.state.rejectProfile}
                onClose={() => {
                    this.setState({ ...this.initialState });
                }}
            >
                <DialogTitle>{"Error Saving Profile"}</DialogTitle>
                <DialogContent>
                    {errors}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        this.setState({ ...this.initialState });
                    }} color="primary" autoFocus>
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        return (
            <>
                {this.ErrorDialog()}
                {this.RedirectDialog()}
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
            </>
        );
    }
}

export default ProfileWizard;