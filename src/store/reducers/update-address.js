import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  successMessage: '',
  failureMessage: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_ADDRESS_START:
          return { ...state, loading: true };

        case actionTypes.UPDATE_ADDRESS_SUCCESS:
          return { ...state, loading: false, successMessage: action.message, failureMessage: '' };

        case actionTypes.UPDATE_ADDRESS_SUCCESS_WITH_WARNING:
          return { ...state, loading: false, successMessage: '', failureMessage: action.message };

        case actionTypes.UPDATE_ADDRESS_FAILURE:
          return { ...state, loading: false, successMessage: '', failureMessage: action.message };

        case actionTypes.LOGOUT:
          return { ...state, loading: false, failureMessage: '', successMessage: '' };

        default: return state;
    }
}

export default reducer;