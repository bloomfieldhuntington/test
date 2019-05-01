import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS
} from './types';

export const addPost = postData => dispath => {
    axios
    .post('/api/posts', postData)
    .then(res => dispath({
        type: ADD_POST,
        payload: res.data
    })
    )
    .catch(err => dispath({
        type: GET_ERRORS,
        payload: err.response.data
    })
    );
}