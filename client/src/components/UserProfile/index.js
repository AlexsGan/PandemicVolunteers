import React from "react";
import "./styles.css";
import { Container } from "@material-ui/core";
import { getAge, getRequests, handleSaveEdit } from "../../actions/user-profile";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import Navbar from "../Navbar";

class UserProfile extends React.Component {
    state = {
        userObject: this.props.location.state.userObject.isAdmin ? (
            { ...this.props.location.state.userObject }
        ) : (
            {
                ...this.props.location.state.userObject,
                age: getAge(this.props.location.state.userObject.birthday),
                requestsAccepted: getRequests("accepted"),
                requestsSent: getRequests("sent"),
                requestsCompleted: getRequests("completed")
            }
        )
    }

    render() {
        return (
            <>
                <Navbar
                    userObject={this.state.userObject}
                    currentPath={this.props.location.pathname}
                />
                <Container className="profile" maxWidth="md">
                    <ProfileHeader userObject={this.state.userObject}/>
                    {
                        this.state.userObject.isAdmin ? null : (
                            <ProfileBody
                                userObject={this.state.userObject}
                                handleSaveEdit={(event, body) => handleSaveEdit(event, body, this)}
                            />
                        )
                    }
                </Container>
            </>
        );
    }
}

export default UserProfile;