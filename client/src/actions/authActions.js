import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// REGISTER USER
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/company/c_users/register", userData)
        .then(res => history.push('/business_login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
// LOGIN C_user - Get user Token
export const loginUser = userData => dispatch => {
    axios.post('/api/company/c_users/login', userData)
    .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to localStorage - localStorage only stores strings
        localStorage.setItem('jwtToken', token);
        // Set token to Auth Header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log User Out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth Header for future requirest
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}
