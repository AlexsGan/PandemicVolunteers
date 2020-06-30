import React from 'react';

// Import react router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

// Import components
import View from "./components/LandingView";
import Register from "./components/Register";
import ProfileWizard from "./components/Register/ProfileWizard";
import UserProfile from "./components/UserProfile";

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={View}/>
            <Route exact path ='/register' component={Register}/>
            <Route exact path ='/register/create-profile' component={ProfileWizard}/>
            <Route exact path ='/profile' component={UserProfile}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;