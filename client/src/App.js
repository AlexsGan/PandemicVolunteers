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
import ProfileWizard from "./components/Register/ProfileWizard";
import UserProfile from "./components/UserProfile";
import Login from './components/Login';
import Navbar from "./components/Navbar";

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        currentUser: null
    }

    render() {
        return (
            <BrowserRouter>
                <>
                    <Navbar loggedIn={this.state.currentUser !== null} />
                    <Switch>
                        <Route exact path={['/', '/home', '/about', '/map']} component={Home}/>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/login' render={(props) => <Login {...props} app={this}/>}/>
                        <Route exact path='/register' render={(props) => <Register {...props} app={this}/>}/>
                        <ProtectedRoute path='/register/create-profile' component={ProfileWizard}
                                        fallbackPath='/register' app={this}/>
                        }/>
                        <ProtectedRoute path='/profile' component={UserProfile} fallbackPath='/login' app={this}/>
                        <ProtectedRoute path='/group-chat' component={GroupChat} fallbackPath='/login' app={this}/>
                        <Route exact path='/requests' render={(props) => <Requests {...props} app={this}/>}/>
                        <Route render={() => <div>404 Not found</div>}/>
                    </Switch>
                </>
            </BrowserRouter>
        );
    }
}

export default App;