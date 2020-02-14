import * as actionTypes from './actionTypes';
import axios from 'axios';

const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
}

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
    }
}