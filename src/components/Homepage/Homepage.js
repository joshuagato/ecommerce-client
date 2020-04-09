import React, { Component } from 'react';
import './Homepage.scss';

import { connect } from 'react-redux';

import Auxil from '../Hoc/Auxil';
import Banner from './Banner/Banner';
import AllProducts from './AllProducts/AllProducts';

class Homepage extends Component {
  render() {
    return (
      <div className='homepage'>
        <Banner />
        <AllProducts />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedUserReducer.personalDetails.name !== null && state.loggedUserReducer.personalDetails.token !== null,
    btnDisabled: state.regisReducer.btnDisabled
  };
}

// was just testing redux
export default connect(mapStateToProps)(Homepage);
