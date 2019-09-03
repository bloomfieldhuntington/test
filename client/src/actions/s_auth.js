import axios from 'axios';
import { setAlert } from './alert';
import {
    S_REGISTER_SUCCESS, 
    S_REGISTER_FAILED,
    S_USER_LOADED,
    S_AUTH_ERROR,
    S_LOGIN_SUCCESS,
    S_LOGIN_FAILED,
    CLEAR_PROFILE,
    S_LOGOUT
    } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const s_loadUser = () => async dispatch => {
    // check for token
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    // make request, res.data returns the user
    try {
        const res = await axios.get('./api/s_auth')
        dispatch({
            type: S_USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: S_AUTH_ERROR
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
        const res = await axios.post('/api/s_users', body, config);
        dispatch({
            type: S_REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(s_loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'red')));
        }
        dispatch({
            type: S_REGISTER_FAILED
        })
    }
}

// Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post('/api/s_auth', body, config);
        dispatch({
            type: S_LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(s_loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'red')));
        }
        dispatch({
            type: S_LOGIN_FAILED
        })
    }
}

// Logout user
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: S_LOGOUT
    })
}