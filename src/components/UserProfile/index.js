import React from "react";
import "./styles.css";
import { Box, Container } from "@material-ui/core";
import { getAge, handleSaveEdit, handleTextChange } from "../../actions/user-profile";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

class UserProfile extends React.Component {
    state = {
        userObject: {
            ...this.props.location.state.userObject,
            age: getAge(this.props.location.state.userObject.birthday),
            // BACKEND: Pull accepted, sent, and completed request counts from server
            acceptedRequests: 0,
            sentRequests: 0,
            completedRequests: 0
        }
    }

    render() {
        return (
            <Box>
                <Container className="profile" maxWidth="md">
                    <ProfileHeader userObject={this.state.userObject}/>
                    <ProfileBody 
                        userObject={this.state.userObject}
                        handleSaveEdit={(event, body) => handleSaveEdit(event, body, this)}
                    />
                </Container>
            </Box>
        );
    }
}

export default UserProfile;