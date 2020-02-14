import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    password: '',
    btnDisabled: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.types) {

        case actionTypes.LOGIN_START:
            return { ...state, loading: true };

        default: return state;
    }
}

export default reducer;