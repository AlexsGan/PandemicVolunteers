import React from "react";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../styles.css";

class LoginForm extends React.Component {
    render() {
        const {
            username,
            password,
            credentialError,
            handleTextChange,
            handleSubmit
        } = this.props;

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="username"
                        variant="outlined"
                        label="Username"
                        value={username}
                        onChange={handleTextChange}
                        error={credentialError}
                        helperText={credentialError === true ? 'Invalid username & password combination' : ''}
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
                        error={credentialError}
                        helperText={credentialError === true ? 'Invalid username & password combination' : ''}
                        onChange={handleTextChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        name="login"
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        User Login
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        name="loginAdmin"
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        ADMIN Login
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        or
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Link className="login__register-link" to={"/register"}>
                        <Button
                            name="register"
                            color="secondary"
                            variant="contained"
                            fullWidth
                        >
                            Register
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}

export default LoginForm;