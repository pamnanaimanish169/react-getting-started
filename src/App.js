import './App.css';
import React from 'react';
import  { Route,  Switch } from  'react-router-dom';

import  Update  from './components/Update';
import Home from './components/Home';

class App extends React.Component {
  
  constructor(props)  {
    super(props);
  }

  render()  {
    return(
      <div>
        <Switch>
          <Route  path='/'  exact>
            <Home />
          </Route>

          <Route  path='/update/:id' exact>
            <Update />
          </Route>
        </Switch>
    </div>
    );
  }
}

export  default App;