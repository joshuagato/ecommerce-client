import React, { Component } from 'react';
import './NavBar.scss';

import { connect } from 'react-redux';

// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../../src/assets/img/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faCartPlus, faKey } from '@fortawesome/free-solid-svg-icons';

export class NavBar extends Component {

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

    componentDidUpdate() {
        // console.log(this.props.name)
    }
       
    render() {
        return (
            <Navbar id="rbNavbar" expand="lg">
                <Navbar.Brand href="/">
                    <img src={Logo} alt='logo' width='50' />Amazon
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto ml-5">
                        <Nav.Link href="/categories">Categories</Nav.Link>
                            {
                                this.props.name ? <NavDropdown title={this.props.name} id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/profile">
                                                <FontAwesomeIcon icon={faUserAlt} /> Profile
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/logout">
                                                <FontAwesomeIcon icon={faKey} /> Logout
                                            </NavDropdown.Item>
                                        </NavDropdown> :
                                <Nav.Link href="/login">
                                    Login
                                </Nav.Link>
                            }
                        <Nav.Link href="/cart">
                            <FontAwesomeIcon icon={faCartPlus} /> Cart
                        </Nav.Link>
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
        name: state.loggedUserReducer.personalDetails.name,
        token: state.loginReducer.token,
    };
}

export default connect(mapStateToProps)(NavBar);
