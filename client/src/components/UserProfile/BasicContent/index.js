import React from "react";
import { Grid, TextField } from "@material-ui/core";
import "../styles.css";
import { getFormattedBirthday } from "../../../actions/user-profile";

class BasicContent extends React.Component {
    render() {
        const {
            userObject,
            editableUserObject,
            getEditStatus,
            handleTextChange,
            firstNameError,
            lastNameError,
            usernameError,
            passwordError,
            birthdayError
        } = this.props

        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name="firstName"
                        variant="outlined"
                        label="First Name"
                        value={editableUserObject.firstName}
                        onChange={handleTextChange}
                        error={firstNameError}
                        helperText={firstNameError}
                        fullWidth
                        inputProps={{
                            readOnly: !getEditStatus()
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="lastName"
                        variant="outlined"
                        label="Last Name"
                        value={editableUserObject.lastName}
                        error={lastNameError}
                        helperText={lastNameError}
                        onChange={handleTextChange}
                        fullWidth
                        inputProps={{
                            readOnly: !getEditStatus()
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="username"
                        variant="outlined"
                        label="Username"
                        value={editableUserObject.username}
                        onChange={handleTextChange}
                        error={usernameError}
                        helperText={usernameError}
                        fullWidth
                        inputProps={{
                            readOnly: !getEditStatus()
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="password"
                        variant="outlined"
                        label="Password"
                        type="password"
                        value={editableUserObject.password}
                        error={passwordError}
                        helperText={passwordError ? passwordError : 'Changes your password.'}
                        onChange={handleTextChange}
                        fullWidth
                        inputProps={{
                            readOnly: !getEditStatus()
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="birthday"
                        variant="outlined"
                        label="Birthday"
                        type="date"
                        value={getFormattedBirthday(editableUserObject.birthday)}
                        error={birthdayError}
                        helperText={birthdayError}
                        onChange={handleTextChange}
                        inputProps={{
                            readOnly: !getEditStatus()
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                </Grid>
            </Grid>
        );
    }
}

export default BasicContent;