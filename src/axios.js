import axios from 'axios';
import _ from 'lodash';

import { refreshToken } from './services/userService';
import { jwtDecode } from "jwt-decode";
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

// const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
//     const error = new Error();
//     error.httpStatusCode = httpStatusCode;
//     error.statusCode = statusCode;
//     error.errorMessage = errorMessage;
//     error.problems = problems;
//     error.errorCode = errorCode + "";
//     return error;
// };

// export const isSuccessStatusCode = (s) => {
//     // May be string or number
//     const statusType = typeof s;
//     return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
// };

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;
instance.interceptors.request.use(async function (config) {
    // let date = new Date()
    // const decodedToken = jwtDecode(config.headers && config.headers.authorization ? config.headers.authorization.split(' ')[1] : '');
    // if (decodedToken.exp < date.time / 1000) {
    //     const res = await refreshToken();
    // }
    return config;
}, function (error) {
    return Promise.reject(error);
}
)
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error)
}
    // (response) => {
    //     const { data } = response;
    //     return response.data;
    // }
);
//     (error) => {
//         // const { response } = error;
//         // if (response == null) {
//         //     return Promise.reject(error);
//         // }

//         // const { data } = response;

//         // if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
//         //     return Promise.reject(createError(response.status, data['s'], data['errmsg']));
//         // }

//         // if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
//         //     return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
//         // }

//         // return Promise.reject(createError(response.status));
//     }
// );

export default instance;
