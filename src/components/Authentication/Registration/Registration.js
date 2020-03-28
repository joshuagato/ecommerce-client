import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import Auxil from '../../Hoc/Auxil';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.registerRef = React.createRef();

        this.state = {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          isAnAdmin: false
        };
    }

    formInputHandler = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

  register = event => {
    event.preventDefault();

    const input = {
      name: this.state.name,
      email: this.state.email,
      isAnAdmin: this.state.isAnAdmin,
      password: this.state.password
    };

    this.props.onRegister(input);
  };

  handleScroll = () => {
    setTimeout(() => {
      this.registerRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  };

    componentDidMount() {
        this.props.disableRegisterButton();
    }

    componentDidUpdate(prevProps, prevState) {
      const state = this.state;
      const props = this.props;

      if (prevState.name !== state.name || prevState.email || state.email || prevState.password !== state.password
          || prevState.confirmPassword !== state.confirmPassword || prevProps.successMessage !== props.successMessage) {

        if(state.name && state.email && state.password && state.confirmPassword) this.props.enableRegisterButton();
        else this.props.disableRegisterButton();

        if (this.props.successMessage && !props.btnDisabled) {
          this.setState({ name: '', email: '', password: '', confirmPassword: '' });
          this.handleScroll();
        }
      }
    }

    render() {
      let redirectPage;
        if (this.props.loggedIn) redirectPage = <Redirect to='/' />
        
        return (
          <section className="addBg" ref={this.registerRef}>
            { redirectPage }
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
                      <form onSubmit={this.register} className={'mb-3'}>
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
                        <hr />
                        <button type="submit" className="btn btn-success btn-block submitBtn"
                          disabled={this.props.btnDisabled}>
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
                      <article className={'text-center'}>
                        <span>Already registered? </span>
                        <NavLink to='/login' className="text-muted">Login Here!</NavLink>
                      </article>
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
        loggedIn: state.loggedUserReducer.personalDetails.name !== null && 
            state.loggedUserReducer.personalDetails.token !== null,
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
