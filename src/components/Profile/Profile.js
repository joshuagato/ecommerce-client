import React, { Component } from 'react';
import './Profile.scss';
import { connect } from 'react-redux';

import Auxil from '../Hoc/Auxil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export class Profile extends Component {

    state = {
        user: 'Joshua Gato'
    }

    render() {
        const { name, email, isSeller, token } = this.props;

        return (
            <Auxil>
                { name && email && isSeller && token ?
                    <section id="profile">
                        <div className="container px-3 py-4">
                            <h4 className="display-4">My Profile</h4>
                            <hr />
                            
                            <div className="row">
                                <div className="col-md-3">
                                    <img alt="user-img" className="rounded-circle image"
                                        src='https://gravatar.com/avatar/ec6507b2298e89557c09ff5a55eba36d?s200&d=retro' />
                                </div>
                                <div className="col-md-8 ml-3">
                                    <p id="name" className="lead">{'Joshua Gato'}</p>
                                    <NavLink to="/profile/orders" className="btn btn-warning">My Orders</NavLink>
                                    <br /><br />
                                    <NavLink to="/profile/settings" className="btn btn-warning">Change Account Settings</NavLink>
                                    <br /><br />
                                    <NavLink to="/profile/address" className="btn btn-warning">Change Shipping Address</NavLink>
                                    <br /><br />
                                    <div>
                                        <p className="lead">Seller Actions</p>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <NavLink to="/profile/postproduct" className="btn btn-outline-success btn-block">
                                                    Post Product for Sale
                                                </NavLink>
                                            </div>
                                            <div className="col-md-6">
                                                <NavLink to="/profile/myproducts" className="btn btn-outline-info btn-block">
                                                    My Products
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> :
                    <div className="m-auto settingsSpinner">
                        <h1 className="text-center display-3">
                            <FontAwesomeIcon icon={faSpinner} spin />
                        </h1>
                    </div>
                }
            </Auxil>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.loginReducer.name,
        email: state.loginReducer.email,
        isSeller: state.loginReducer.isSeller,
        token: state.loginReducer.token
    };
}

export default connect(mapStateToProps)(Profile);
