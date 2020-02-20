import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_START:
            return { ...state, loading: true };

        case actionTypes.UPDATE_SUCCESS:
            return { ...state, loading: false };

        case actionTypes.UPDATE_FAILURE:
            return { ...state, loading: false };

        default: return state;
    }
}

export default reducer;