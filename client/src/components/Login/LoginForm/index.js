import React from "react";
import { Typography, Button, Grid, TextField } from "@material-ui/core";
import { handleTextChange, handleSubmit } from "../../../actions/login";
import { Link } from "react-router-dom";
import "../styles.css";

class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        credentialError: false,
        errorText: ""
    }

    constructor(props) {
        super(props);
        this.app = this.props.app
    }

    render() {
        const {
            username,
            password,
            credentialError,
            errorText
        } = this.state;

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="username"
                        variant="outlined"
                        label="Username"
                        value={username}
                        onChange={(e) => handleTextChange(e, this)}
                        error={credentialError}
                        helperText={credentialError === true ? errorText : ''}
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
                        helperText={credentialError === true ? errorText : ''}
                        onChange={(e) => handleTextChange(e, this)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        name="login"
                        color="primary"
                        variant="contained"
                        onClick={(e) => handleSubmit(e, this)}
                        fullWidth
                    >
                        User Login
                    </Button>
                </Grid>
                {/*<Grid item xs={12}>
                    <Button
                        name="loginAdmin"
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        ADMIN Login
                    </Button>
                </Grid>*/}
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
                <Grid item xs={12}>
                    <Typography color="error" variant="subtitle2" align="center">
                        {credentialError ? '' : errorText}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default LoginForm;