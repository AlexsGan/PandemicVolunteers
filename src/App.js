import React from 'react';

// Import react router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

// Import components
import Landing from "./components/Landing-view/view";

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
                            (<Landing/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;