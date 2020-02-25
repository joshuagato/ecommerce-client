import * as actionTypes from '../actions/actionTypes';

const initialState = {
  btnDisabled: true,
  loading: false,
  successMessage: '',
  failureMessage: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ENABLE_LOGIN:
      return { ...state, btnDisabled: false };

    case actionTypes.DISABLE_LOGIN:
      return { ...state, btnDisabled: true };

    case actionTypes.LOGIN_START:
      return { ...state, loading: true };

    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.token, successMessage: action.message, failureMessage: '' };

    case actionTypes.LOGIN_SUCCESS_WITH_WARNING:
      return { ...state, loading: false, successMessage: '', failureMessage: action.message };

    case actionTypes.LOGIN_FAILURE:
      return { ...state, loading: false, failureMessage: action.message, 
          successMessage: '' };

    case actionTypes.LOGOUT:
      return { ...state, loading: false, failureMessage: '', successMessage: '' };

    default: return state;
  }
}

export default reducer;