import React from 'react';

// Import react router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
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
import Navbar from "./components/Navbar";

// Import cookie checker function
import { checkCookie } from "./actions/user";

class App extends React.Component {
    constructor(props) {
        super(props)
        checkCookie(this);
    }

    state = {
        currentUser: null
    }

    render() {
        const loggedIn = !!this.state.currentUser;
        return (
            <BrowserRouter>
                <>
                    <Navbar loggedIn={this.state.currentUser !== null}/>
                    <Switch>
                        <Route exact path={['/', '/home', '/about', '/map']} component={Home}/>
                        <Route exact path='/home' component={Home}/>
                        <ProtectedRoute authenticated={!loggedIn} path='/login' component={Login}
                                        fallbackPath='/profile' app={this}/>
                        <ProtectedRoute authenticated={!loggedIn} path='/register' component={Register}
                                        fallbackPath='/profile' app={this}/>
                        <ProtectedRoute authenticated={loggedIn} path='/register/create-profile'
                                        component={ProfileWizard}
                                        fallbackPath='/register' app={this}/>
                        }/>
                        <ProtectedRoute authenticated={loggedIn} path='/profile' component={UserProfile}
                                        fallbackPath='/login' app={this}/>
                        <ProtectedRoute authenticated={loggedIn} path='/my-requests' component={GroupChat}
                                        fallbackPath='/login' app={this}/>
                        <Route exact path='/feed' render={(props) => <Requests {...props} app={this}/>}/>
                        <Route render={() => <div>404 Not found</div>}/>
                    </Switch>
                </>
            </BrowserRouter>
        );
    }
}

export default App;