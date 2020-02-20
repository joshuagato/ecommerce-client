import React, { Component } from 'react';
import './Homepage.scss';

import { connect } from 'react-redux';

import Auxil from '../Hoc/Auxil';
import Banner from '../Banner/Banner';

class Homepage extends Component {
  render() {
    return (
      <Auxil>
        <Banner />
        
      </Auxil>
    );
  }
}

const mapStateToProps = state => {
  return {
      btnDisabled: state.regisReducer.btnDisabled
  };
}

// was just testing redux
export default connect(mapStateToProps)(Homepage);
