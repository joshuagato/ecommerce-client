import React, { Component } from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom';

import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import Auxil from './components/Hoc/Auxil';
import Homepage from './components/Homepage/Homepage';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
import Settings from './components/Profile/Settings/Settings';
import Address from './components/Profile/Address/Address';
import Categories from './components/Categories/Categories';
import Error404 from './components/Error404/Error404';

class App extends Component {
  render() {
    return (
      <Auxil>
        <Navbar />
          <Switch>
            <Route path='/register' exact component={Registration} />
            <Route path='/login' exact component={Login} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/profile/settings' exact component={Settings} />
            <Route path='/profile/address' exact component={Address} />
            <Route path='/categories' exact component={Categories} />
            <Route path='/' exact component={Homepage} />
            <Route component={Error404} />
          </Switch>
        <Footer />
      </Auxil>
    );
  }
}

export default App;
