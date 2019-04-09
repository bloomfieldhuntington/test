import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/company/c_profile')
    .then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_PROFILE,
        payload: {}
    }))
}
// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    console.log('Create Profile from profileActions')
    axios
    .post('api/company/c_profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
}

// Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
