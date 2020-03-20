import * as actionTypes from './actionTypes';
import axios from 'axios';

// Actions for enabling/disabling the add-category button
export const enableAddCategoryButton = () => {
  return {
    type: actionTypes.ENABLE_ADD_CATEGORY
  };
}

export const disableAddCategoryButton = () => {
  return {
    type: actionTypes.DISABLE_ADD_CATEGORY
  };
}
// End of Actions for enabling/disabling the add-category button


// Actions for adding categories
const addCategoryStart = () => {
  return {
    type: actionTypes.ADD_CATEGORY_START
  };
}

const addCategorySuccess = message => {
  return {
    type: actionTypes.ADD_CATEGORY_SUCCESS,
    message: message
  };
}

const addCategorySuccessWithWarning = message => {
  return {
    type: actionTypes.ADD_CATEGORY_SUCCESS_WITH_WARNING,
    message: message
  };
}


const addCategoryFailure = message => {
  return {
    type: actionTypes.ADD_CATEGORY_FAILURE,
    message: message
  };
}


const populateCategories = categories => {
  return {
    type: actionTypes.POPULATE_CATEGORIES,
    categories: categories
  };
}
export const fetchCategories = () => {
  return dispatch => {

    axios.get(process.env.REACT_APP_CATEGORIES_URL).then(response => {
      dispatch(populateCategories(response.data.categories));

      localStorage.setItem('categories', JSON.stringify(response.data.categories));
    })
    .catch(error => {
		if (error.response) console.log(error.response.data.message);
	});
  }
}


export const addCategory = categoryName => {
  return dispatch => {
    dispatch(addCategoryStart());

    const requestInput = {
      category: categoryName
    }

    axios.post(process.env.REACT_APP_CATEGORIES_URL, requestInput).then(response => {
      const message = response.data.message;

      if (response.data.success) {
        dispatch(addCategorySuccess(message));
        dispatch(fetchCategories());
      } else
          dispatch(addCategorySuccessWithWarning(message))
    })
    .catch(error => {
		if (error.response) dispatch(addCategoryFailure(error.response.data.message));
	});
  };
}
// End of Actions for adding categories