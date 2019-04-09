import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
// REGISTER SOLVER USER
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/solver/s_users/register", userData)
        .then(res => history.push('/solver_login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
// LOGIN S_user - Get user Token
export const loginSolverUser = userData => dispatch => {
    axios.post('/api/solver/s_users/login', userData)
    .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to locaStorage - localStorage only stores strings
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentSolverUser(decoded));
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
};

// Set loggein user
export const setCurrentSolverUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}