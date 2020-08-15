import React from "react";
import "./styles.css";
import { Container } from "@material-ui/core";
import { handleSaveEdit } from "../../actions/user-profile";
import { getUser } from "../../actions/user";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import { Redirect } from 'react-router-dom';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/profile");
        this.app = this.props.app;
    }

    state = {
        userObject: null,
        redirectToCreateProfile: false,
        redirectToLogin: false,
        defaultUser: true
    }

    componentDidMount() {
        let username = this.props.match.params.username;
        let defaultUser = true;
        if (!username) {
            if (!this.app.state.currentUser) {
                this.setState({redirectToLogin: true});
                return;
            }
            username = this.app.state.currentUser.username;
        } else {
            this.setState({defaultUser: false});
            defaultUser = false;
        }
        getUser(username)
            .then((user) => {
                if (!user.profile && defaultUser && !user.isAdmin) {
                    this.setState({redirectToCreateProfile: true})
                } else {
                    this.setState({ userObject: user });
                }
            })
            .catch(() => {
                this.setState({ userObject: null });
            })
    }

    render() {
        if (this.state.redirectToCreateProfile) {
            return <Redirect to="/register/create-profile"/>;
        } else if (this.state.redirectToLogin) {
            return <Redirect to="/login"/>;
        }
        return (
            <>
                {/*<Navbar
                    userObject={this.state.userObject}
                    currentPath={this.props.location.pathname}
                />*/}
                <Container className="profile" maxWidth="md">
                    <ProfileHeader userObject={this.state.userObject}/>
                    {
                        !this.state.userObject || !this.state.userObject.profile || this.state.userObject.isAdmin ? null : (
                            <ProfileBody
                                app={this.app}
                                isDefaultUser={this.state.defaultUser}
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