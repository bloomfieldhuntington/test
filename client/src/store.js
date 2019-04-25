import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const devtoolcheck = a => a;

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), devtoolcheck));


export default store;
