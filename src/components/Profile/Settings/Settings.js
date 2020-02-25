import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Auxil from '../../Hoc/Auxil';

import Spinner from 'react-bootstrap/Spinner';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Settings.scss';

export class Settings extends Component {

    state = {
        name: '',
        email: '',
        isSeller: false,
        password: '',
        confirmPassword: ''
    }

    inputHandler = event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({ [event.target.name]: value });
    }

    updateDetails = event => {
        event.preventDefault();

        const input = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isSeller: this.state.isSeller,
            token: this.props.token
        };

        this.props.onUpdateDetails(input);
    }

    toBoolean = string => {
        switch(string) {
            case 'true': return true;
            case 'false': return false;
            default: return null
        }
    }

    render() {
        const { name, email, isSeller, token } = this.props;

        return (
            <Auxil>
                {name && email && token ? 
                    <section id="settings" className="addBg">
                        <div className="container-fluid p-5">
                            <div className="row">
                                <div className="col-lg-6 mx-auto">
                                    <h4 className="display-4">My Account Settings</h4>
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
                                            <form onSubmit={this.updateDetails}>
                                                <div className="form-group">
                                                    <label htmlFor="name" className="form-control-label">Name</label>
                                                    <input id="name" type="text" name="name" className="form-control" 
                                                        onChange={this.inputHandler} defaultValue={name} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email" className="form-control-label">Email</label>
                                                    <input id="email" type="email" name="email" className="form-control" 
                                                        onChange={this.inputHandler} defaultValue={email} />
                                                </div>
                                                <div className="form-check mb-3">
                                                    <label className="form-check-label">
                                                        <input type="checkbox" name="isSeller" 
                                                            onChange={this.inputHandler}
                                                                defaultChecked={this.toBoolean(isSeller)}
                                                                    className="form-check-input" />
                                                        Is Seller
                                                    </label>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="newPwd" className="form-control-label">New Password</label>
                                                    <input id="newPwd" type="password" name="newPwd" 
                                                        onChange={this.inputHandler} className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="pwdConfirm" className="form-control-label">Confirm Password</label>
                                                    <input id="pwdConfirm" type="password" name="pwdConfirm" 
                                                        onChange={this.inputHandler} className="form-control" />
                                                </div>
                                                <button type="submit" className="btn btn-success btn-block" 
                                                    id="updateBtn">
                                                    {
                                                        this.props.loading ?
                                                            <Auxil>
                                                                <span>Loading</span>
                                                                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                                            </Auxil> :
                                                            
                                                        'Update Details'
                                                    }
                                                </button>
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
        name: state.loggedUserReducer.personalDetails.name,
        email: state.loggedUserReducer.personalDetails.email,
        isSeller: state.loggedUserReducer.personalDetails.isSeller,
        token: state.loggedUserReducer.personalDetails.token,
        loading: state.updateReducer.loading,
        successMessage: state.updateReducer.successMessage,
        failureMessage: state.updateReducer.failureMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateDetails: input => dispatch(actions.updateDetails(input))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
