import React, { Component } from 'react';
import './Homepage.scss';

import { connect } from 'react-redux';

import Auxil from '../Hoc/Auxil';
import Navbar from '../NavBar/NavBar';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';

class Homepage extends Component {
  render() {
    console.log("BTN", this.props.btnDisabled)
    return (
      <Auxil>
        <Navbar />
        <Banner />
        
        <Footer />
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
