import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    S_REGISTER_SUCCESS,
    S_REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    S_USER_LOADED,
    S_AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    S_LOGIN_SUCCESS,
    S_LOGIN_FAILED,
    LOGOUT,
    S_LOGOUT
} from '../actions/types';

// the 'loading' param should perhaps be set to false. If so, change conditions in 'PrivateROute.js'
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: null, 
    user: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;
    
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case S_LOGIN_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
        }
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case S_LOGIN_FAILED:
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
        case S_REGISTER_SUCCESS: 
        localStorage.setItem('token', payload.token);
        return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
        }
        case S_REGISTER_FAILED: 
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
        }
        case USER_LOADED: 
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
        }
        case S_USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
        }
        case AUTH_ERROR:
        case LOGOUT:
        return {
            ...state,
            token: localStorage.clear(),
            isAuthenticated: false,
            loading: false,
            user: null
        }
        case S_AUTH_ERROR:
        case S_LOGOUT:
        return {
            ...state,
            token: localStorage.clear(),
            isAuthenticated: false,
            loading: false,
            user: null
        }
        default: return state;
    }
}