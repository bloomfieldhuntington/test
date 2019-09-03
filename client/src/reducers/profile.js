import {
    GET_COMPANY_PROFILE, 
    GET_SOLVER_PROFILE, 
    C_PROFILE_ERROR, 
    S_PROFILE_ERROR,
    CLEAR_PROFILE
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case GET_COMPANY_PROFILE:
        case GET_SOLVER_PROFILE:
        return {
            ...state,
            profile: payload,
            loading: false
        };
        case C_PROFILE_ERROR:
        case S_PROFILE_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        };
        case CLEAR_PROFILE:
        return {
            ...state,
            profile: null,
            loading: false
        }
        default:
        return state;

    }
}