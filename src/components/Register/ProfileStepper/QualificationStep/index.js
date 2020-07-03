import React from "react";
import "../styles.css";
import { Typography, Grid, TextField, Slide, Switch } from "@material-ui/core";

/* Component for qualification info, wizard step */
class QualificationStep extends React.Component {
    render() {
        const {
            header,
            description,
            hasEmployment,
            employmentField,
            hasRemoteWork,
            hasVehicle,
            hasLiftAbility,
            liftField,
            hasShoppingAbility,
            employmentFieldError,
            liftFieldError,
            handleChange,
            handleSwitch,
            stepSubmitted
        } = this.props;

        return (
            <Slide direction={stepSubmitted ? "left" : "right"} in={!stepSubmitted} mountOnEnter unmountOnExit>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant = "h5">
                                {header}
                            </Typography>
                            <Typography className="step__description italicized" variant = "subtitle1">
                                {description}
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
                                    error={employmentFieldError}
                                    helperText={employmentFieldError === true ? 'Missing field.' : ''}
                                    required
                                    disabled={hasEmployment === false}
                                />
                            </Grid>
                        : null}
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I am currently working/unemployed at home.
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
                                I am willing to drive and have a driver's license and access to a vehicle.
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
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I am willing to lift and carry.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasLiftAbility}
                                onChange={handleSwitch}
                                name="hasLiftAbility"
                                color="primary"
                            />
                        </Grid>
                        {hasLiftAbility ?
                            <Grid item xs={12}>
                                <TextField
                                    className="step__question"
                                    name="liftField"
                                    variant="outlined"
                                    label="Can lift up to (lbs)"
                                    value={liftField}
                                    onChange={handleChange}
                                    error={liftFieldError}
                                    helperText={liftFieldError === true ? 'Amount must be a positive integer.' : ''}
                                    required
                                    disabled={hasLiftAbility === false}
                                />
                            </Grid>
                        : null}
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I am willing to shop on behalf of others.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasShoppingAbility}
                                onChange={handleSwitch}
                                name="hasShoppingAbility"
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