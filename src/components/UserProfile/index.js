import React from "react";
import "./styles.css";
import { Box, Typography, Container, Grid, Paper } from "@material-ui/core";

class UserProfile extends React.Component {
    state = {

    }

    render() {
        const {
            userObject
        } = this.props

        return (
            <Box>
                <Container className = "profile" maxWidth="md">
                    <Paper className="profile-header" elevation={2}>
                        <Typography className="profile-header__text bold" variant="h2">
                            First Last
                        </Typography>
                    </Paper>
                    <Paper className="profile-body" elevation={2}>
                        <Grid className="profile-body__grid" container spacing={2}>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        );
    }
}

export default UserProfile;