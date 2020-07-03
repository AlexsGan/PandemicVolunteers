import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import "../styles.css";

class ProfileHeader extends React.Component {
    render() {
        const {
            userObject
        } = this.props;

        return (
            <Paper className="profile-header" elevation={4}>
                <Grid className="profile-header__name-grid" container spacing={1}>
                    <Grid item xs={8}>
                        <Typography className="profile-header__name bold" variant="h2">
                            {userObject.firstName} {userObject.lastName}
                        </Typography>
                    </Grid>
                    <Grid className="profile-header__side-grid" direction="column" container item xs={4} spacing={1}>
                        <Grid item xs={12}>
                            <Typography className="profile-header__side" variant="subtitle1">
                                <span className="bold">Age: </span>{userObject.age}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="profile-header__side" variant="subtitle1">
                                <span className="bold">Accepted Requests: </span>{userObject.acceptedRequests}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="profile-header__side" variant="subtitle1">
                                <span className="bold">Sent Requests: </span>{userObject.sentRequests}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="profile-header__side" variant="subtitle1">
                                <span className="bold">Completed Requests: </span>{userObject.completedRequests}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default ProfileHeader;