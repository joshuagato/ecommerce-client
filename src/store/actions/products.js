import axios from 'axios';
import * as actionTypes from './actionTypes';

const populateProducts = products => {
  return {
    type: actionTypes.POPULATE_PRODUCTS,
    products: products
  };
}

export const fetchProducts = () => {
  return (dispatch, getState) => {

    const { token } = getState().loggedUserReducer.personalDetails;
    
    const axiosHeaders = {
      headers: {
        Authorization: token
      }
    }

    axios.get(process.env.REACT_APP_SELLER_PRODUCTS_URL, axiosHeaders).then(response => {
      dispatch(populateProducts(response.data.products));
    })
    .catch(error => {
      if (error.response) console.log(error.response.data.message);
    });
  }
}