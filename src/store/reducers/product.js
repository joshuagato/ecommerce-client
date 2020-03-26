import * as actionTypes from '../actions/actionTypes';

const initialState = {
  product: '',
  successMessage: '',
  failureMessage: '',
  btnDisabled: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case actionTypes.ENABLE_ADD_REVIEW:
      return { ...state, btnDisabled: false };

    case actionTypes.DISABLE_ADD_REVIEW:
      return { ...state, btnDisabled: true };

    case actionTypes.POPULATE_PRODUCT:
      return { ...state, product: action.product };

    case actionTypes.ADD_REVIEW_START:
      return { ...state, btnDisabled: true };

    case actionTypes.ADD_REVIEW_SUCCESS:
      return { ...state, successMessage: action.message, btnDisabled: false };

    case actionTypes.ADD_REVIEW_SUCCESS_WITH_WARNING:
      return { ...state, failureMessage: action.message, btnDisabled: false };

    case actionTypes.ADD_REVIEW_FAILURE:
      return { ...state, failureMessage: action.message, btnDisabled: false };

    default:
      return state;
  }
}

export default reducer;