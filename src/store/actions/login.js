import * as actionTypes from './actionTypes';
import { getLoggedInUserDetails, getLoggedInUserAddress } from '../actions/index';
import axios from 'axios';

// Actions for enabling/disabling the login button
export const enableLoginButton = () => {
  return {
    type: actionTypes.ENABLE_LOGIN
  };
}

export const disableLoginButton = () => {
  return {
    type: actionTypes.DISABLE_LOGIN
  };
}
// End of Actions for enabling/disabling the login button


// Actions for user login
const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
}

const loginSuccess = response => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    message: response.message,
    token: response.token
  };
}

const loginSuccessWithWarning = message => {
  return {
    type: actionTypes.LOGIN_SUCCESS_WITH_WARNING,
    message: message
  };
}

const loginFailure = message => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    message: message
  };
}

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());

    const requestInput = {
      email: email,
      password: password
    }

    axios.post(process.env.REACT_APP_LOGIN_URL, requestInput).then(response => {
      if(response.data.success) {
        dispatch(loginSuccess(response.data));
        dispatch(getLoggedInUserDetails(response.data.token));
        dispatch(getLoggedInUserAddress(response.data.token));
        localStorage.setItem('token', response.data.token);
      } else  
        dispatch(loginSuccessWithWarning(response.data.message));
    })
    .catch(error => {
      if (error.response) dispatch(loginFailure(error.response.data.message));
    });
  }
}
// End of actions for user login

export const logout = () => {
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  localStorage.removeItem('isAnAdmin');
  localStorage.removeItem('addr1');
  localStorage.removeItem('addr2');
  localStorage.removeItem('city');
  localStorage.removeItem('country');
  localStorage.removeItem('postalCode');
  localStorage.removeItem('state');

  return {
    type: actionTypes.LOGOUT
  };
}