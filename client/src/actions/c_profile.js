import axios from 'axios';
// import { setAlert } from './alert';
import { GET_COMPANY_PROFILE, C_PROFILE_ERROR } from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/c_profile/profile');
        dispatch({
            type: GET_COMPANY_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: C_PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}