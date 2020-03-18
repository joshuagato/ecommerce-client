import * as actionTypes from './actionTypes';
import axios from 'axios';


// Actions for enabling/disabling the add-category button
export const enableAddProductButton = () => {
  return {
    type: actionTypes.ENABLE_ADD_PRODUCT
  };
}

export const disableAddProductButton = () => {
  return {
    type: actionTypes.DISABLE_ADD_PRODUCT
  };
}
// End of Actions for enabling/disabling the add-category button


// Actions for adding categories
const addProductStart = () => {
  return {
    type: actionTypes.ADD_PRODUCT_START
  };
}

const addProductSuccess = message => {
  return {
    type: actionTypes.ADD_PRODUCT_SUCCESS,
    message: message
  };
}

const addProductSuccessWithWarning = message => {
  return {
    type: actionTypes.ADD_PRODUCT_SUCCESS_WITH_WARNING,
    message: message
  };
}

const addProductFailure = message => {
  return {
    type: actionTypes.ADD_PRODUCT_FAILURE,
    message: message
  };
}

export const addProduct = inputData => {

  return (dispatch, getState) => {
    dispatch(addProductStart());

    const { token } = getState().loggedUserReducer.personalDetails;
    
    const axiosHeaders = {
      headers: {
        Authorization: token
      }
    }

    axios.post(process.env.REACT_APP_SELLER_PRODUCTS_URL, inputData, axiosHeaders).then(response => {
      const message = response.data.message;
      response.data.success ? dispatch(addProductSuccess(message)) : dispatch(addProductSuccessWithWarning(message));
    })
    .catch(error => { dispatch(addProductFailure(error.response.data.message)));
  };
}
// End of Actions for adding categories