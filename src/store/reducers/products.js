import * as actionTypes from '../actions/actionTypes';

const initialState = {
  products: [],
  
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.POPULATE_PRODUCTS:
      return { ...state, products: action.products };

    default:
      return state;
  }
}

export default reducer;