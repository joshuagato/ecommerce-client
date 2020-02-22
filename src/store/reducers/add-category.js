import * as actionTypes from '../actions/actionTypes';

const initialState = {
    btnDisabled: true,
    loading: false,
    successMessage: '',
    failureMessage: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.ENABLE_ADD_CATEGORY:
            return { ...state, btnDisabled: false };

        case actionTypes.DISABLE_ADD_CATEGORY:
            return { ...state, btnDisabled: true };

        case actionTypes.ADD_CATEGORY_START:
            return { ...state, loading: true };

        case actionTypes.ADD_CATEGORY_SUCCESS:
            return { ...state, loading: false, successMessage: action.message, failureMessage: '' };

        case actionTypes.ADD_CATEGORY_SUCCESS_WITH_WARNING:
            return { ...state, loading: false, successMessage: '', failureMessage: action.message };

        case actionTypes.ADD_CATEGORY_FAILURE:
            return { ...state, loading: false, failureMessage: action.message, successMessage: '' };

        case actionTypes.LOGOUT:
            return { ...state, loading: false, failureMessage: '', successMessage: '', btnDisabled: true };

        default: return state;
    }
}

export default reducer;