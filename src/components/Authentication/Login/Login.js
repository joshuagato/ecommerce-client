import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';

import Spinner from 'react-bootstrap/Spinner';
import Auxil from '../../Hoc/Auxil';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

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

  loginHandler = event => {
    event.preventDefault();

    this.props.onLogin(this.state.email, this.state.password);
  }

  componentDidMount() {
    this.props.disableLoginButton();
  }

  componentDidUpdate() {
    const state = this.state;

    if(state.email && state.password) this.props.enableLoginButton();
    else this.props.disableLoginButton();

    if (this.props.successMessage && !this.props.btnDisabled) this.setState({ email: '', password: '' });
  }

  render() {
    let redirectPage;
    if (this.props.loggedIn) redirectPage = <Redirect to='/' />

    return (
      <React.Fragment>
        { redirectPage }
        <section className="addBg">
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
                    <h4 className="text-center">Login</h4>
                    <hr />
                    <form onSubmit={this.loginHandler} className={'mb-3'}>
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
                      <button type="submit" className="btn btn-success btn-block submitBtn"
                              disabled={this.props.btnDisabled}>
                        {
                          this.props.loading ?
                            <Auxil>
                              <span>Loading</span>
                              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            </Auxil> :

                            'Login'
                        }
                      </button>
                    </form>
                    <article className={'text-center'}>
                      <span>Not registered yet? </span>
                      <NavLink to='/register' className="text-muted">Signup Here</NavLink>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedUserReducer.personalDetails.name !== null &&
        state.loggedUserReducer.personalDetails.token !== null,
    loading: state.loginReducer.loading,
    btnDisabled: state.loginReducer.btnDisabled,
    successMessage: state.loginReducer.successMessage,
    failureMessage: state.loginReducer.failureMessage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    enableLoginButton: () => dispatch(actions.enableLoginButton()),
    disableLoginButton: () => dispatch(actions.disableLoginButton())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
