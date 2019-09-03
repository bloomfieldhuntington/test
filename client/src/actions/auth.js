import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS, 
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    CLEAR_PROFILE
    } from './types';
import setAuthToken from '../utils/setAuthToken';


// Load user
export const loadUser = () => async dispatch => {
    // check for token
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        // make request, res.data return the user
        const res = await axios.get('/api/c_auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log('To bad')
        dispatch({
            type: AUTH_ERROR
        })   
    }
}

// Register user
export const register = ({name, email, password}) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});
    try {
        const res = await axios.post('/api/c_users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser()); // Load user asap
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'red')));
        }
        dispatch({
            type: REGISTER_FAILED
        })
    }
}

// Login user
export const login = (email, password) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post('/api/c_auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser()); // Load user asap
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'red')));
        }
        dispatch({
            type: LOGIN_FAILED
        })
    }
}

// Logout user
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
}