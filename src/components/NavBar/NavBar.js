import React, { Component } from 'react';
import './NavBar.scss';

// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import Logo from '../../../src/assets/img/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export class NavBar extends Component {

    constructor(props) {

        super(props);
    
          this.state = {
            searchTerm: ''
          }
    
          // this.searchTerm = '';
          this.isCollapsed = true;
          this.token = '';
    }
    
      // get token() {
      //   return localStorage.getItem('token');
      // }
    
    collapse = () => {
        this.isCollapsed = true;
    }
    
    collpseHandler = () => {
        this.isCollapsed = !this.isCollapsed;
    }
    
    closeDropdown = dropdown => {
        dropdown.close();
    }
    
    logout = () => {}

    search = event => {    
        this.setState({ searchTerm: event.target.value });
        
        if(event.keyCode === 13) console.log("Hi there, " + event.target.value);

        if(event.target.name === 'searchBtn') console.log("Hi there, " + event.target.value);
    }
       
    render() {
        const divStyle = {
            alignItems: 'left',
            marginLeft: '50px',
            width: '100%'
        }

        return (
            <Navbar expand="lg" id="rbNavbar">
                <Navbar.Brand href="#home" className="text-white">
                <img src={Logo} alt="logo" id="logo" />
                Amazon
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="flex-column" style={divStyle}>
                        <div className="input-group w-75">
                        <input id="searchInput" type="text" name="search" className="form-control" onKeyUp={this.search} 
                            onChange={this.search} value={this.state.searchTerm} />
                        <span id="searchBtn" name="searchBtn" className="bg-warning" onClick={this.search}>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        </div>
                        <div className="w-75">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <NavLink onClick={this.collapse} to='categories' activeClassName='active' 
                                className="nav-link text-white">Categories</NavLink>
                            </li>
                            <li className='nav-item ml-0 ml-md-auto' id="dropDown">
                            <FontAwesomeIcon icon={faUser} />
                            <NavDropdown title={!this.token ? 'Account' : null} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                            </NavDropdown>
                            </li>
                        </ul>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;
