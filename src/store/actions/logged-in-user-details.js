import axios from 'axios';
import * as actionTypes from './actionTypes';

const populateLoggedInUserDetails = userData => {
    return {
        type: actionTypes.POPULATE_LOGGEDIN_USER_DETAILS,
        user: userData.user,
        token: userData.token
    }
}

export const getLoggedInUserDetails = token => {
    return dispatch => {

        const axiosHeaders = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        };

        axios.get(process.env.REACT_APP_UPDATE_DETAILS_URL, axiosHeaders).then(response => {
            dispatch(populateLoggedInUserDetails(response.data));
        })
        .catch(error => console.log(error))
    };
}