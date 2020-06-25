import React from "react";
import "./styles.css";
import { Typography, Grid, TextField, MenuItem, Slide } from "@material-ui/core";

/* Component for location info, wizard step */
class LocationStep extends React.Component {
    render() {
        const {
            city,
            province,
            handleChange,
            submitted
        } = this.props;

        return (
            <Slide direction={"left"} in={!submitted} mountOnEnter unmountOnExit>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant = "h5">
                                Your Current Location
                            </Typography>
                            <Typography className="step__description" variant = "subtitle1">
                                Used to retrieve news and volunteer requests near you.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className="step__field-container" container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                name="city"
                                variant="standard"
                                label="City"
                                value={city}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="province"
                                id="select"
                                label = "Province"
                                value={province}
                                onChange={handleChange}
                                select
                                required
                                fullWidth
                            >
                                <MenuItem value="AB">Alberta</MenuItem>
                                <MenuItem value="BC">British Columbia</MenuItem>
                                <MenuItem value="MB">Manitoba</MenuItem>
                                <MenuItem value="NB">New Brunswick</MenuItem>
                                <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
                                <MenuItem value="NS">Nova Scotia</MenuItem>
                                <MenuItem value="ON">Ontario</MenuItem>
                                <MenuItem value="PE">Prince Edward Island</MenuItem>
                                <MenuItem value="QC">Quebec</MenuItem>
                                <MenuItem value="SK">Saskatchewan</MenuItem>
                                <MenuItem value="NT">Northwest Territories</MenuItem>
                                <MenuItem value="NU">Nunavut</MenuItem>
                                <MenuItem value="YT">Yukon</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Slide>
        );
    }
}

export default LocationStep;