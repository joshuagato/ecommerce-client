import React, { Component } from 'react';
import './Registration.scss';

import { Alert } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import Auxil from '../Hoc/Auxil';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Registration extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isSeller: false
    }

    formInputHandler = event => {
        // if (event.target.type === 'checkbox') this.setState({ [event.target.name]: event.target.checked });

        // this.setState({ [event.target.name]: event.target.value });

        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({ [event.target.name]: value });
    };

    register = event => {
        event.preventDefault();

        const input = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isSeller: this.state.isSeller
        };

        this.props.onRegister(input);
    };

    componentDidMount() {
        this.props.disableRegisterButton();
    }

    componentDidUpdate() {
        const state = this.state;

        if(state.name && state.email && state.password && state.confirmPassword) this.props.enableRegisterButton()
        else this.props.disableRegisterButton()
    }

    render() {
        return (
            <section id="registrationPage">
                <div className="container p-5">
                    <div className="row mt-5">
                        <div className="col-lg-5 mx-auto">
                        {
                            this.props.successMessage || this.props.failureMessage ? 
                                <Alert color={this.props.successMessage ? 'success' : 'danger'}>
                                    {this.props.successMessage || this.props.failureMessage}
                                </Alert> :
                                null
                        }
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h4 className="text-center">Registration</h4>
                                    <hr />
                                    <form onSubmit={this.register}>
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Name</label>
                                            <input id="name" type="text" name="name" className="form-control" 
                                                onChange={this.formInputHandler} value={this.state.name} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-control-label">Email</label>
                                            <input id="email" type="email" name="email" className="form-control" 
                                                onChange={this.formInputHandler} value={this.state.email} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="form-control-label">Password</label>
                                            <input id="password" type="password" name="password" className="form-control" 
                                                onChange={this.formInputHandler} value={this.state.password} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword" className="form-control-label">Confirm Password</label>
                                            <input id="confirmPassword" type="password" name="confirmPassword" className="form-control" 
                                                onChange={this.formInputHandler} value={this.state.confirmPassword} />
                                        </div>
                                        <div className="form-check">
                                            <label htmlFor="isSeller" className="form-check-label">
                                                <input id="isSeller" type="checkbox" name="isSeller" className="form-check-input" 
                                                    onChange={this.formInputHandler} value={this.state.isSeller} /> 
                                                    Register as Seller
                                            </label>
                                        </div>
                                        <hr />
                                        <button type="submit" className="btn btn-primary btn-block" 
                                            id="registerBtn" disabled={this.props.btnDisabled}>
                                            {
                                                this.props.loading ?
                                                    <Auxil>
                                                        <span>Loading</span>
                                                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                                    </Auxil> :
                                                    
                                                'Register'
                                            }
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        btnDisabled: state.regisReducer.btnDisabled,
        loading: state.regisReducer.loading,
        successMessage: state.regisReducer.successMessage,
        failureMessage: state.regisReducer.failureMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        enableRegisterButton: () => dispatch(actions.enableRegisterButton()), 
        disableRegisterButton: () => dispatch(actions.disableRegisterButton()),
        onRegister: input => dispatch(actions.register(input))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
