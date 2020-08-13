import React from "react";
import "./styles.css";
import { Container } from "@material-ui/core";
import { getAge, getRequests, handleSaveEdit } from "../../actions/user-profile";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/profile");
        this.app = this.props.app;
    }

    render() {
        return (
            <>
                {/*<Navbar
                    userObject={this.state.userObject}
                    currentPath={this.props.location.pathname}
                />*/}
                <Container className="profile" maxWidth="md">
                    <ProfileHeader userObject={this.app.state.currentUser}/>
                    {
                        this.app.state.currentUser.isAdmin ? null : (
                            <ProfileBody
                                app={this.app}
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