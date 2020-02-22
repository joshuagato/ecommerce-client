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

export const addCategory = categoryName => {
    return dispatch => {
        dispatch(addCategoryStart());

        const requestInput = {
            category: categoryName
        }

        axios.post(process.env.REACT_APP_CATEGORIES_URL, requestInput).then(response => {
            const message = response.data.message;
            response.data.success ? dispatch(addCategorySuccess(message)) : dispatch(addCategorySuccessWithWarning(message));
        })
        .catch(error => {
            console.log(error);
            dispatch(addCategoryFailure(error.response));
        });
    };
}
// End of Actions for adding categories