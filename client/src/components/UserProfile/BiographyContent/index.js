import React from "react";
import "../styles.css";
import { TextField, Typography } from "@material-ui/core";

class BiographyContent extends React.Component {
    render() {
        const {
            userProfile,
            editableUserProfile,
            getEditStatus,
            handleTextChange
        } = this.props

        return (
            getEditStatus() ? (
                <TextField
                    className="profile-category__biography-field"
                    name="biography"
                    value={editableUserProfile.biography}
                    label="Enter new biography below"
                    onChange={handleTextChange}
                    inputProps={{maxLength: 160}}
                    fullWidth
                >
                </TextField>
            ) : (
                <Typography variant="body1">
                    {
                        editableUserProfile.hasBiography ? (
                            editableUserProfile.biography
                        ) : (
                            <span className="italicize">No biography provided.</span>
                        )
                    }
                </Typography>
            )
        );
    }
}

export default BiographyContent;