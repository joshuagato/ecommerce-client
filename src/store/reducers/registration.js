import * as actionTypes from '../actions/actionTypes';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isSeller: false,
    btnDisabled: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REG_START:
            return {};
            
        default: return state;
    }
}

export default reducer;