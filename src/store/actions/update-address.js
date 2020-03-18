import axios from 'axios';
import * as actionTypes from './actionTypes';

// Actions for address update
const updateAddressStart = () => {
  return {
    type: actionTypes.UPDATE_ADDRESS_START
  };
}

const updateAddressSuccess = (response, message) => {
  return {
    type: actionTypes.UPDATE_ADDRESS_SUCCESS,
    message: message,
    address: response.address
  };
}

const updateAddressSuccessWithWarning = message => {
  return {
    type: actionTypes.UPDATE_ADDRESS_SUCCESS_WITH_WARNING,
    message: message
  };
}

const updateAddressFailure = message => {
  return {
    type: actionTypes.UPDATE_ADDRESS_FAILURE,
    message: message
  };
}

export const updateAddress = userInput => {
  return dispatch => {
    dispatch(updateAddressStart());

    const requestInput = {
      addr1: userInput.addr1,
      addr2: userInput.addr2,
      city: userInput.city,
      state: userInput.state,
      country: userInput.country,
      postalCode: userInput.postalCode
    }
    
    const axiosHeaders = {
      headers: {
        Authorization: userInput.token,
        'Content-Type': 'application/json'
      }
    };

    axios.post(process.env.REACT_APP_UPDATE_ADDRESS_URL, requestInput, axiosHeaders).then(response => {
        const postResponse = response.data;

        if(response.data.success) {
            axios.get(process.env.REACT_APP_UPDATE_ADDRESS_URL, axiosHeaders).then(response => {

              const getResponse = response.data;
              if(getResponse.success) {
                  dispatch(updateAddressSuccess(getResponse, postResponse.message));

                  localStorage.setItem('addr1', getResponse.address.addr1);
                  localStorage.setItem('addr2', getResponse.address.addr2);
                  localStorage.setItem('city', getResponse.address.city);
                  localStorage.setItem('state', getResponse.address.state);
                  localStorage.setItem('country', getResponse.address.country);
                  localStorage.setItem('postalCode', getResponse.address.postalCode);
              } else  
                  dispatch(updateAddressSuccessWithWarning(postResponse.message))
            })
            .catch(error => dispatch(updateAddressFailure(error.response.data.message)));
        }
    })
    .catch(error => dispatch(updateAddressFailure(error.response.data.message)));
  };
}
// End of actions for address update