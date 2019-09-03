import axios from 'axios';
// import { setAlert } from './alert';
import { GET_SOLVER_PROFILE, S_PROFILE_ERROR } from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/s_profile/profile');
        dispatch({
            type: GET_SOLVER_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: S_PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}