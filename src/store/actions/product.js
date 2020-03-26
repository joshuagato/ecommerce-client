import axios from 'axios';
import * as actionTypes from './actionTypes';

const populateProduct = product => {
  return {
    type: actionTypes.POPULATE_PRODUCT,
    product: product
  };
}

export const fetchProduct = productId => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_GENERAL_PRODUCTS_URL}/${productId}`).then(response => {
      dispatch(populateProduct(response.data.product));
    })
    .catch(error => {
      if (error.response) console.log(error.response.data.message);
    });
  }
}

const addReviewStart = () => {
  return {
    type: actionTypes.ADD_REVIEW_START
  };
};

const addReviewSuccess = message => {
  return {
    type: actionTypes.ADD_REVIEW_SUCCESS,
    message: message
  };
};

const addReviewSuccessWithWarning = message => {
  return {
    type: actionTypes.ADD_REVIEW_SUCCESS_WITH_WARNING,
    message: message
  };
};

const addReviewFailure = message => {
  return {
    type: actionTypes.ADD_REVIEW_FAILURE,
    message: message
  };
};


export const postReview = (review, headers, productId) => {
  return dispatch => {
    dispatch(addReviewStart())
    axios.post(process.env.REACT_APP_PRODUCT_REVIEW_URL, review, headers)
    .then(response => {
      console.log(response.data);
      dispatch(fetchProduct(productId));
      if(response.data.success) dispatch(addReviewSuccess(response.data.message));
      else dispatch(addReviewSuccessWithWarning(response.data.message));
    })
    .catch(error => {
      console.log(error);
      if (error.response) dispatch(addReviewFailure(error.response.data.message));
    });
  };
};