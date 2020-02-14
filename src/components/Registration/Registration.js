import React, { Component } from 'react';
import './Registration.scss';

import { connect } from 'react-redux';

class Registration extends Component {

    formInputHandler = () => {};

    register = () => {};

    render() {
        return (
            <section id="registrationPage">
                <div className="container p-5">
                    <div className="row mt-5">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="card-body">
                                <h4 className="text-center">Registration</h4>
                                <hr />
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-control-label">Name</label>
                                        <input id="name" type="text" name="name" className="form-control" 
                                            onChange={this.formInputHandler} value={this.props.name} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-control-label">Email</label>
                                        <input id="email" type="email" name="email" className="form-control" 
                                            onChange={this.formInputHandler} value={this.props.email} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-control-label">Password</label>
                                        <input id="password" type="password" name="password" className="form-control" 
                                            onChange={this.formInputHandler} value={this.props.password} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword" className="form-control-label">Confirm Password</label>
                                        <input id="confirmPassword" type="password" name="confirmPassword" className="form-control" 
                                            onChange={this.formInputHandler} value={this.props.confirmPassword} />
                                    </div>
                                    <div className="form-check">
                                        <label htmlFor="isSeller" className="form-check-label">
                                        <input id="isSeller" type="checkbox" name="isSeller" className="form-control" 
                                            onChange={this.formInputHandler} value={this.props.isSeller} />
                                                Register as Seller </label>
                                    </div>
                                    <hr />
                                    <button type="button" className="btn btn-primary btn-block" onClick={this.register} 
                                        disabled={this.props.btnDisabled}>Register</button>
                                </form>
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
        name: state.regReducer.name,
        email: state.regReducer.email,
        password: state.regReducer.password,
        confirmPassword: state.regReducer.confirmPassword,
        isSeller: state.regReducer.isSeller,
        btnDisabled: state.regReducer.btnDisabled
    };
}

export default connect(mapStateToProps)(Registration);
