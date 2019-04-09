import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
// Business
import profileReducer from './company/profileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});