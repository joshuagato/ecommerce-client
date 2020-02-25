import * as actionTypes from './actionTypes';
import axios from 'axios';


// Actions for enabling/disabling the register button
export const enableRegisterButton = () => {
  return {
    type: actionTypes.ENABLE_REGISTER
  };
}

export const disableRegisterButton = () => {
  return {
    type: actionTypes.DISABLE_REGISTER
  };
}
// End of Actions for enabling/disabling the register button


// Actions for Registration
const regStart = () => {
  return {
    type: actionTypes.REG_START
  };
}

const regSuccess = message => {
  return {
    type: actionTypes.REG_SUCCESS,
    message: message
  };
}

const regSuccessWithWarning = message => {
  return {
    type: actionTypes.REG_SUCCESS_WITH_WARNING,
    message: message
  };
}


const regFailure = message => {
  return {
    type: actionTypes.REG_FAILURE,
    message: message
  };
}

export const register = userInput => {
  return dispatch => {
    dispatch(regStart());

    const requestInput = {
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
      isSeller: userInput.isSeller
    }

    axios.post(process.env.REACT_APP_SIGNUP_URL, requestInput).then(response => {
      const message = response.data.message;
      response.data.success ? dispatch(regSuccess(message)) : dispatch(regSuccessWithWarning(message));
    })
    .catch(error => {
        console.log(error);
        dispatch(regFailure(error.response));
    });
  };
}
// End of Actions for Registration