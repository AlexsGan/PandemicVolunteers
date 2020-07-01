import React from "react";
import "../styles.css";
import { Typography, Grid, Button, Slide, Switch, TextField } from "@material-ui/core";

/* Component for list of additional qualification inputs */
class QualificationList extends React.Component {
    render () {
        const {
            additionalQuals, 
            handleQualTextChange
        } = this.props;

        let textFields = additionalQuals.map((qualification, index) => 
            <Grid key={index} item xs={6}>
                <TextField
                    className="step__question"
                    name={index.toString()}
                    variant="outlined"
                    label={`Qualification ${index}`}
                    value={qualification}
                    onChange={handleQualTextChange}
                />
            </Grid>
        )

        return (
            textFields
        );
    }
}

/* Component for preferences info, wizard step */
class PreferenceStep extends React.Component {
    render() {
        const {
            header,
            description,
            hasBiography,
            biographyField,
            hasVisibleProfile,
            hasVulnerable,
            additionalQuals,
            handleSwitch,
            handleTextChange,
            handleAdd,
            handleQualTextChange,
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
                                I would like to display a biography on my profile page.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasBiography}
                                onChange={handleSwitch}
                                name="hasBiography"
                                color="primary"
                            />
                        </Grid>
                        {hasBiography ?
                            <Grid item xs={12}>
                                <TextField
                                    name="biographyField"
                                    variant="outlined"
                                    label="Biography (160 characters max)"
                                    value={biographyField}
                                    onChange={handleTextChange}
                                    fullWidth
                                    disabled={hasBiography === false}
                                    inputProps={{maxLength: 160}}
                                />
                            </Grid>
                        : null}
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I would like my profile information to be publically visible.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasVisibleProfile}
                                onChange={handleSwitch}
                                name="hasVisibleProfile"
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                I am or live with an individual who belongs to a&nbsp;
                                <a 
                                    href="https://www.canada.ca/en/public-health/services/publications/diseases-conditions/vulnerable-populations-covid-19.html"
                                    target="_blank" 
                                    rel="noopener noreferrer">
                                    vulnerable population
                                </a>.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={hasVulnerable}
                                onChange={handleSwitch}
                                name="hasVulnerable"
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className="step__question" variant = "body1">
                                <span className = "italicized">OPTIONAL: </span>
                                Add additional/custom qualifications to my profile.
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleAdd}
                            >
                                Add
                            </Button>
                        </Grid>
                        <Grid item xs={1}/>
                            {/* Render text inputs for additional qualifications */}
                            <QualificationList
                                additionalQuals={additionalQuals}
                                handleQualTextChange={handleQualTextChange}
                            />
                    </Grid>
                </Grid>
            </Slide>
        );
    }
}

export default PreferenceStep;