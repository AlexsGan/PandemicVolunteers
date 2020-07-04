import React from 'react';

// Import react router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

// Import components
import GroupChat from "./components/GroupChat";
import Home from "./components/Home";
import Requests from "./components/Requests";
import Register from "./components/Register";
import ProfileWizard from "./components/Register/ProfileWizard";
import UserProfile from "./components/UserProfile";
import Login from './components/Login';

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/group-chat' component={GroupChat} />
            <Route exact path='/requests' component={Requests} />
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path ='/login' component={Login} />
            <Route exact path ='/register' component={Register} />
            <Route exact path ='/register/create-profile' component={ProfileWizard} />
            <Route exact path ='/profile' component={UserProfile} />
            <Route exact path ='/about' component={Home} />
            <Route exact path ='/map' component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;