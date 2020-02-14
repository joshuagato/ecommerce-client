import React, { Component } from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom';

import Auxil from './components/Hoc/Auxil';
import Homepage from './components/Homepage/Homepage';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Error404 from './components/Error404/Error404';

class App extends Component {
  render() {
    return (
      <Auxil>
        <Switch>
          <Route path='/register' exact component={Registration} />
          <Route path='/login' exact component={Login} />
          <Route path='/' exact component={Homepage} />
          <Route component={Error404} />
        </Switch>
      </Auxil>
    );
  }
}

export default App;
