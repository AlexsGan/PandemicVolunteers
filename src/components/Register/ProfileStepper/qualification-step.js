import React from "react";
import "./styles.css";
import { Typography, Grid, TextField, Slide, Switch } from "@material-ui/core";

/* Component for qualification info, wizard step */
class QualificationStep extends React.Component {
    render() {
        const {
            hasEmployment,
            employmentField,
            hasRemoteWork,
            hasVehicle,
            handleChange,
            handleSwitch,
            submitted
        } = this.props;

        return (
            <Slide direction={submitted ? "left" : "right"} in={!submitted} mountOnEnter unmountOnExit>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant = "h5">
                                Your Qualifications
                            </Typography>
                            <Typography className="step__description" variant = "subtitle1">
                                Used to recommend and filter volunteer requests.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className="step__field-container" container spacing={2}>
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I am currently employed.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasEmployment}
                                onChange={handleSwitch}
                                name="hasEmployment"
                                color="primary"
                            />
                        </Grid>
                        {hasEmployment ?
                            <Grid item xs={12}>
                                <TextField
                                    className="step__question"
                                    name="employmentField"
                                    variant="outlined"
                                    label="Field of Employment"
                                    value={employmentField}
                                    onChange={handleChange}
                                    required
                                    disabled={hasEmployment === false}
                                />
                            </Grid>
                        : null}
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I am currently working from home or unemployed.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasRemoteWork}
                                onChange={handleSwitch}
                                name="hasRemoteWork"
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I have access to a vehicle.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasVehicle}
                                onChange={handleSwitch}
                                name="hasVehicle"
                                color="primary"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Slide>
        );
    }
}

export default QualificationStep;