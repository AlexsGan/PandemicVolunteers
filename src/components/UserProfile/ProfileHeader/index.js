import React from "react";
import { Typography, Grid, Paper, Divider } from "@material-ui/core";
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
                        {
                            userObject.isAdmin ? (
                                <Typography className="profile-header__name--admin bold" variant="h2">
                                    Admin
                                </Typography>
                            ) : (
                                <Typography className="profile-header__name bold" variant="h2">
                                    {userObject.firstName} {userObject.lastName}
                                </Typography>
                            )
                        }
                        <Typography className="profile-header__username" variant="h6">
                            @{userObject.username}
                        </Typography>
                    </Grid>
                    { 
                        // Render user stats if not an admin
                        userObject.isAdmin ? (
                            <Grid item xs={3}/>
                        ) : (
                            <>
                                <Divider className="profile-header__divider" variant="vertical" flexItem xs={1}/>
                                <Grid className="profile-header__side-grid" direction="column" container item xs={3} spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography className="profile-header__side" variant="subtitle1">
                                            <span className="bold">Age: </span>{userObject.age}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className="profile-header__side" variant="subtitle1">
                                            <span className="bold">Accepted Requests: </span>{userObject.requestsAccepted}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className="profile-header__side" variant="subtitle1">
                                            <span className="bold">Sent Requests: </span>{userObject.requestsSent}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className="profile-header__side" variant="subtitle1">
                                            <span className="bold">Completed Requests: </span>{userObject.requestsCompleted}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    }
                </Grid>
            </Paper>
        );
    }
}

export default ProfileHeader;