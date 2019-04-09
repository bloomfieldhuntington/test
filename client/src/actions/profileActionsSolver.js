import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

// Get current SOLVER profile
export const getCurrentSolverProfile = () => dispatch => {
    dispatch(setProfileSolverLoading());
    axios.get('/api/solver/s_profile')
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
export const createProfileSolver = (profileData, history) => dispatch => {
    axios
    .post('api/solver/s_profile', profileData)
    .then(res => history.push('/dashboard_solver'))
    .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
}

// Profile Loading
export const setProfileSolverLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
// Clear Profile
export const clearCurrentSolverProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}