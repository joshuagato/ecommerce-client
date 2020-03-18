import axios from 'axios';
import * as actionTypes from './actionTypes';

// Actions for details update
const updateStart = () => {
  return {
    type: actionTypes.UPDATE_START
  };
}

const updateSuccess = (response, message) => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    message: message,
    user: response.user,
    token: response.token
  };
}

const updateSuccessWithWarning = message => {
    return {
      type: actionTypes.UPDATE_SUCCESS_WITH_WARNING,
      message: message
    };
}

const updateFailure = message => {
    return {
      type: actionTypes.UPDATE_FAILURE,
      message: message
    };
}

export const updateDetails = userInput => {
    return dispatch => {
      dispatch(updateStart());

        const requestInput = {
          name: userInput.name,
          email: userInput.email,
          password: userInput.password,
          isSeller: userInput.isSeller
        }
        
        const axiosHeaders = {
          headers: {
            Authorization: userInput.token,
            'Content-Type': 'application/json'
          }
        };

        axios.post(process.env.REACT_APP_UPDATE_DETAILS_URL, requestInput, axiosHeaders).then(response => {
          const postResponse = response.data;
          
          if(response.data.success) {
            axios.get(process.env.REACT_APP_UPDATE_DETAILS_URL, axiosHeaders).then(response => {

              const getResponse = response.data;
              if(getResponse.success) {
                dispatch(updateSuccess(getResponse, postResponse.message));
                
                localStorage.setItem('name', getResponse.user.name);
                localStorage.setItem('email', getResponse.user.email);
                localStorage.setItem('isSeller', getResponse.user.isSeller);
                localStorage.setItem('token', getResponse.token);
              } else  
                dispatch(updateSuccessWithWarning(postResponse.message))
            })
            .catch(error => {
              dispatch(updateFailure(error.response.data.message))
            });
          }
        })
        .catch(error => dispatch(updateFailure(error.response.data.message)));
    };
}
// End of actions for details update