import * as actionTypes from '../actions/actionTypes';

const initialState = {
  btnDisabled: true,
  loading: false,
  successMessage: '',
  failureMessage: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ENABLE_ADD_PRODUCT:
      return { ...state, btnDisabled: false };

    case actionTypes.DISABLE_ADD_PRODUCT:
      return { ...state, btnDisabled: true };

    case actionTypes.ADD_PRODUCT_START:
      return { ...state, loading: true };

    case actionTypes.ADD_PRODUCT_SUCCESS:
      return { ...state, loading: false, successMessage: action.message, failureMessage: '' };

    case actionTypes.ADD_PRODUCT_SUCCESS_WITH_WARNING:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.ADD_PRODUCT_FAILURE:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.LOGOUT:
      return { ...state, loading: false, failureMessage: '', successMessage: '', btnDisabled: true };

    default: return state;
  }
}

export default reducer;