import React from "react";
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

/* Component for register form */
class RegisterForm extends React.Component {
    render() {
        const {
            firstName,
            lastName,
            username,
            password,
            birthday,
            firstNameError,
            lastNameError,
            usernameError,
            passwordError,
            birthdayError,
            serverError,
            handleChange,
            handleSubmit,
        } = this.props;

        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name="firstName"
                        variant="outlined"
                        label="First Name"
                        value={firstName}
                        onChange={handleChange}
                        error={firstNameError}
                        helperText={firstNameError}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="lastName"
                        variant="outlined"
                        label="Last Name"
                        value={lastName}
                        onChange={handleChange}
                        error={lastNameError}
                        helperText={lastNameError}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="username"
                        variant="outlined"
                        label="Username"
                        value={username}
                        onChange={handleChange}
                        error={usernameError}
                        helperText={usernameError}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="password"
                        variant="outlined"
                        label="Password"
                        type="password"
                        value={password}
                        error={passwordError}
                        helperText={passwordError}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="birthday"
                        variant="outlined"
                        label="Birthday"
                        type="date"
                        value={birthday}
                        error={birthdayError}
                        helperText={birthdayError}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Register
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="error" variant="subtitle2" align="center">
                        {serverError}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default RegisterForm;
