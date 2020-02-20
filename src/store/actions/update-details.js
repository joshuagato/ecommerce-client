import axios from 'axios';
import * as actionTypes from './actionTypes';

// Actions for details update
const updateStart = () => {
    return {
        type: actionTypes.UPDATE_START
    };
}

const updateSuccess = response => {
    return {
        type: actionTypes.UPDATE_SUCCESS,
        message: response.message,
        details: response.userDetails
    };
}

const updateSuccessWithWarning = message => {
    return {
        type: actionTypes.UPDATE_SUCCESS_WITH_WARNING,
        message: message
    };
}

const updateFailure = message => {
    return {
        type: actionTypes.UPDATE_FAILURE,
        message: message
    };
}

export const updateDetails = userInput => {
    return dispatch => {
        dispatch(updateStart());

            const requestInput = {
                name: userInput.name,
                email: userInput.email,
                password: userInput.password,
                isSeller: userInput.isSeller
            }
            
            const axiosHeaders = {
                headers: {
                    Authorization: userInput.token,
                    'Content-Type': 'application/json'
                }
            };

            // console.log(userInput.token);

            axios.post(process.env.REACT_APP_UPDATE_DETAILS_URL, requestInput, axiosHeaders).then(response => {
                
                if(response.data.success) {

                    axios.get(process.env.REACT_APP_UPDATE_DETAILS_URL, axiosHeaders).then(response => {

                        const res = response.data;
                        
                        if(res.success) {
                            dispatch(updateSuccess(res));
                            localStorage.setItem('name', res.userDetails.name);
                            localStorage.setItem('email', res.userDetails.email);
                            localStorage.setItem('isSeller', res.userDetails.isSeller);
                            localStorage.setItem('token', res.userDetails.token);
                        } else  
                            dispatch(updateSuccessWithWarning(res.message))
                    })
                    .catch(error => {

                    });
                }
                
            })
            .catch(error => {
                console.log(error);
                dispatch(updateFailure(error.response));
            });
    };
}
// End of actions for details update