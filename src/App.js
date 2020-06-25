import React from 'react';

// Import react router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

// Import components
import View from "./components/LandingView";

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
                            (<View/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;