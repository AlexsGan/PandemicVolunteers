import React from 'react';

// Import react router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

// Import components
import Landing from "./components/Landing";
import Register from "./components/Register";
import ProfileWizard from "./components/Register/ProfileWizard";

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
                            (<Landing/>)}/>
            <Route exact path ='/register' render ={() => 
                            (<Register/>)}/>
            <Route exact path ='/register/create-profile' render = {() =>
                            (<ProfileWizard/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;