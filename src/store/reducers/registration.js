import * as actionTypes from '../actions/actionTypes';

const initialState = {
    btnDisabled: true,
    loading: false,
    successMessage: '',
    failureMessage: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.ENABLE_REGISTER:
            return { ...state, btnDisabled: false };

        case actionTypes.DISABLE_REGISTER:
            return { ...state, btnDisabled: true };

        case actionTypes.REG_START:
            return { ...state, loading: true };

        case actionTypes.REG_SUCCESS:
            return { ...state, loading: false, successMessage: action.message, failureMessage: '' };

        case actionTypes.REG_SUCCESS_WITH_WARNING:
            return { ...state, loading: false, successMessage: '', failureMessage: action.message };

        case actionTypes.REG_FAILURE:
            return { ...state, loading: false, failureMessage: action.message, successMessage: '' };
            
        default: return state;
    }
}

export default reducer;