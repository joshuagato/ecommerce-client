import React, { Component } from 'react';
import './NavBar.scss';

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../../src/assets/img/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faShoppingCart, faKey } from '@fortawesome/free-solid-svg-icons';
// import * as actions from '../../store/actions/index';

class NavBar extends Component {

  collapse = () => {
      this.isCollapsed = true;
  }
    
  collpseHandler = () => {
      this.isCollapsed = !this.isCollapsed;
  }

  closeDropdown = dropdown => {
      dropdown.close();
  }

  logout = () => {};

  search = event => {
    this.setState({ searchTerm: event.target.value });

    if(event.keyCode === 13) console.log("Hi there, " + event.target.value);

    if(event.target.name === 'searchBtn') console.log("Hi there, " + event.target.value);
  }

  componentDidUpdate() {
    // console.log(this.props.name)
  }
       
  render() {
    return (
      <Navbar id="rbNavbar" expand="lg">
        <Navbar.Brand>
          <NavLink to='/' className="nav-link" role="button"><img src={Logo} alt='logo' width='50' />Amazon</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-5">
            { this.props.isAnAdmin && <NavLink to="/categories" className="nav-link" role="button">Categories</NavLink> }
              {
                this.props.name ? <NavDropdown title={this.props.name} id="basic-nav-dropdown">
                  <NavLink to='/profile' className="dropdown-item nav-link" role="button"><FontAwesomeIcon icon={faUserAlt} /> Profile</NavLink>
                  <NavLink to='/logout' className="dropdown-item nav-link" role="button"><FontAwesomeIcon icon={faKey} /> Logout</NavLink>
              </NavDropdown> :
                <NavLink to='/login' className="nav-link" role="button">Login</NavLink>
              }
            <NavLink to='/cart' className="nav-link" role="button">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </NavLink>
          </Nav>
          <Form inline>
            <FormControl type="search" placeholder="Search" id="searchInput" />
            <Button variant="success" id="searchBtn">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAnAdmin: state.loggedUserReducer.personalDetails.isAnAdmin,
    name: state.loggedUserReducer.personalDetails.name,
    token: state.loginReducer.token,
  };
}

// const mapDispatchToProps = dispatch => {
//   return {
//     logout: () => dispatch(actions.logout())
//   };
// };

export default connect(mapStateToProps)(NavBar);
