import React, { Component } from 'react';
import './Address.scss';
import { connect } from 'react-redux';
import Auxil from '../../Hoc/Auxil';
import Spinner from 'react-bootstrap/Spinner';
import * as actions from '../../../store/actions/index';
import { Alert } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export class Address extends Component {

    state = {
        addr1: '',
        addr2: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
    }

    inputHandler = event => {

        this.setState({ [event.target.name]: event.target.value });
    }

    updateAddress = event => {
        event.preventDefault();

        const input = {
            addr1: this.state.addr1,
            addr2: this.state.addr2,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            postalCode: this.state.postalCode,
            token: this.props.token
        };
        
        this.props.onUpdateAddress(input);
    }

    render() {
        const { addr1, addr2, city, country, postalCode, state } = this.props;
        
        return (
            <Auxil>
                {addr1 && addr2 && country && postalCode && state ?
                    <section id="address">
                        <div className="container p-5">
                            <div className="row">
                                <div className="col-lg-6 mx-auto">
                                <h4 className="display-4">My Shipping Address</h4>
                                    <hr />
                                    {
                                        this.props.successMessage || this.props.failureMessage ? 
                                            <Alert color={this.props.successMessage ? 'success' : 'danger'}>
                                                {this.props.successMessage || this.props.failureMessage}
                                            </Alert> :
                                        null
                                    }
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <form onSubmit={this.updateAddress}>
                                                <div className="form-group">
                                                    <label htmlFor="addr1" className="">Address 1</label>
                                                    <input id="addr1" type="text" name="addr1" className="form-control"
                                                        onChange={this.inputHandler} defaultValue={addr1} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="addr2" className="">Address 2</label>
                                                    <input id="addr2" type="text" name="addr2" className="form-control"
                                                        onChange={this.inputHandler} defaultValue={addr2} />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="city">City</label>
                                                            <input id="city" name="city" className="form-control"
                                                                onChange={this.inputHandler} defaultValue={city} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="state">State</label>
                                                            <input id="state" name="state" className="form-control"
                                                                onChange={this.inputHandler} defaultValue={state} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="postalCode">Postal Code</label>
                                                            <input id="postalCode" name="postalCode" className="form-control"
                                                                onChange={this.inputHandler} defaultValue={postalCode} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="country">Country</label>
                                                            <input id="country" name="country" className="form-control"
                                                                onChange={this.inputHandler} defaultValue={country} />
                                                        </div>
                                                        <button type="submit" className="btn btn-success btn-block" 
                                                            id="updateBtn">
                                                            {
                                                                this.props.loading ?
                                                                    <Auxil>
                                                                        <span>Loading</span>
                                                                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                                                    </Auxil> :
                                                                    
                                                                'Change Address'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
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
        addr1: state.loggedUserReducer.shippingAddress.addr1,
        addr2: state.loggedUserReducer.shippingAddress.addr2,
        city: state.loggedUserReducer.shippingAddress.city,
        state: state.loggedUserReducer.shippingAddress.state,
        country: state.loggedUserReducer.shippingAddress.country,
        postalCode: state.loggedUserReducer.shippingAddress.postalCode,
        token: state.loggedUserReducer.personalDetails.token,
        loading: state.updateAddressReducer.loading,
        successMessage: state.updateAddressReducer.successMessage,
        failureMessage: state.updateAddressReducer.failureMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateAddress: input => dispatch(actions.updateAddress(input))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Address);
