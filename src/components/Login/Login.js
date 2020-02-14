import React, { Component } from 'react';
import './Login.scss';

import { connect } from 'react-redux';

export class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    formInputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        // this.setState({ [event.target.name]: event.target.value });
        this.setState({ [name]: value });
    }

    loginHandler = () => {

    }

    render() {
        return (
            <section id="loginPage">
                <div className="container p-5">
                    <div className="row mt-5">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="card-body">
                                <h4 className="text-center">Login</h4>
                                <hr />
                                <form onSubmit={this.loginHandler}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" name="email" className="form-control" 
                                            value={this.state.email} onChange={this.formInputHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" name="password" className="form-control" 
                                            value={this.state.password} onChange={this.formInputHandler} />
                                    </div>
                                    <hr />
                                    <button type="submit" className="btn btn-primary btn-block" disabled={this.props.btnDisabled}>Login</button>
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
        email: state.loginReducer.email,
        password: state.loginReducer.password,
        btnDisabled: state.loginReducer.btnDisabled
    };
}

export default connect(mapStateToProps)(Login);
