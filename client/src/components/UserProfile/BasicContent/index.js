import React from "react";
import { Grid, TextField } from "@material-ui/core";
import "../styles.css";

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
                        helperText={firstNameError === true ? 'Invalid first name.' : ''}
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
                        helperText={lastNameError === true ? 'Invalid last name.' : ''}
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
                        helperText={usernameError === true ? 'Username already in use or invalid.' : ''}
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
                        value={getEditStatus() ? editableUserObject.password : "placeholder"}
                        error={passwordError}
                        helperText={passwordError === true ? 'Invalid password.' : ''}
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
                        value={editableUserObject.birthday}
                        error={birthdayError}
                        helperText={birthdayError === true ? 'You must be 18 years or older.' : ''}
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