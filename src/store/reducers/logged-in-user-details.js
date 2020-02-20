import * as actionTypes from '../actions/actionTypes';

const initialState = {
    personalDetails: {
        name: '' || localStorage.getItem('name'),
        email: '' || localStorage.getItem('email'),
        isSeller: '' || localStorage.getItem('isSeller'),
        token: '' || localStorage.getItem('token')
    },
    shippingAddress: {

    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.POPULATE_LOGGEDIN_USER_DETAILS:
            return { name: action.user.name, email: action.user.email, 
                isSeller: action.user.isSeller, token: action.token };

        default: return state;
    }
}

export default reducer;