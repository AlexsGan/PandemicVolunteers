import React from "react";
import "../styles.css";
import { Typography, Grid, TextField, MenuItem, Slide } from "@material-ui/core";

/* Component for location info, wizard step */
class LocationStep extends React.Component {
    render() {
        const {
            header,
            description,
            city,
            province,
            cityError,
            provinceError,
            handleChange,
            stepSubmitted
        } = this.props;

        return (
            <Slide direction={"left"} in={!stepSubmitted} mountOnEnter unmountOnExit>
                <Grid container spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                {header}
                            </Typography>
                            <Typography className="step__description italicized" variant="subtitle1">
                                {description}
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
                                error={cityError}
                                helperText={cityError === true ? 'Invalid city.' : ''}
                                onChange={handleChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="province"
                                id="select"
                                label="Province"
                                value={province}
                                error={provinceError}
                                helperText={provinceError === true ? 'Invalid province.' : ''}
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