import React from 'react';

// Import react router
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';

// Import components
import ProtectedRoute from "./components/ProtectedRoute";
import GroupChat from "./components/GroupChat";
import Home from "./components/Home";
import Requests from "./components/Requests";
import Register from "./components/Register";
import ProfileWizard from "./components/ProfileWizard";
import UserProfile from "./components/UserProfile";
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from "./components/Navbar";

// Import cookie checker function
import { checkCookie } from "./actions/user";

class App extends React.Component {
    constructor(props) {
        super(props)
        checkCookie(this);
    }

    state = {
        currentUser: null,
        userUpdated: false
    }

    componentDidUpdate(_prevProps, _prevState, _ss) {
        // currentUser state needs to be updated
        if (this.state.userUpdated) {
            // Update state if session is still valid
            checkCookie(this);
        }
    }

    render() {
        if (!this.state.userUpdated) {
            const loggedIn = !!this.state.currentUser;
          /*
            const protectedProfileProps = {
                authenticated: loggedIn && !!this.state.currentUser.profile,
                exact: true,
                path: '/profile',
                component: UserProfile,
                fallbackPath: '/register/create-profile',
                app: this
            };
            */
            return (
                <BrowserRouter>
                    <>
                        <Navbar loggedIn={loggedIn}/>
                        <Switch>
                            <Route exact path={['/', '/home', '/about', '/map']} component={Home}/>
                            <Route exact path='/home' component={Home}/>
                            <ProtectedRoute authenticated={!loggedIn} exact path='/login' component={Login}
                                            fallbackPath='/profile' app={this}/>
                            <ProtectedRoute authenticated={!loggedIn} exact path='/register' component={Register}
                                            fallbackPath='/home' app={this}/>
                            <ProtectedRoute authenticated={loggedIn && !this.state.currentUser.profile}
                                            exact path='/register/create-profile'
                                            component={ProfileWizard}
                                            fallbackPath='/login' app={this}/>
                            <Route exact path='/profile/:username?'
                                   render={(props) => <UserProfile {...props} app={this} />} />
                            <ProtectedRoute authenticated={loggedIn} exact path='/my-requests' component={GroupChat}
                                            fallbackPath='/login' app={this}/>
                            <ProtectedRoute authenticated={loggedIn} exact path='/logout' component={Logout}
                                            fallbackPath='/home' app={this}/>
                            <Route exact path='/feed' render={(props) => <Requests {...props} app={this}/>}/>
                            {/*No match*/}
                            <Route render={() => <h1>404 Not Found</h1>}/>
                        </Switch>
                    </>
                </BrowserRouter>
            );
        } else {
            return null;
        }
    }
}

export default App;