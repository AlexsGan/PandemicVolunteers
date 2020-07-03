import React from "react";
import "./styles.css";
import { Box, Container } from "@material-ui/core";
import { getAge, getRequests, handleSaveEdit, handleTextChange } from "../../actions/user-profile";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

class UserProfile extends React.Component {
    state = {
        userObject: {
            ...this.props.location.state.userObject,
            age: getAge(this.props.location.state.userObject.birthday),
            requestsAccepted: getRequests("accepted"),
            requestsSent: getRequests("sent"),
            requestsCompleted: getRequests("completed")
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