import axios from 'axios';
import _ from 'lodash';
import axiosRetry from 'axios-retry';
import store from "./redux"
import actionTypes from './store/actions/actionTypes';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});
// Cấu hình axios-retry cho instance
axiosRetry(instance, {
    retries: 3, // Số lần thử lại
    retryCondition: (error) => {
        console.log('Retry condition checked for status:', error.response ? error.response.status : 'No response');
        return axiosRetry.isNetworkError(error) || (error.response && error.response.status >= 300);
    },
    retryDelay: (retryCount) => {
        console.log(`Retry attempt: ${retryCount}`);
        return retryCount * 1000; // 1000 ms = 1 giây
    },
    validateResponse: (response) => {
        console.log('response', response)
        // Hàm này được sử dụng để xác định liệu phản hồi của yêu cầu đã thành công hay không.
        // Trong trường hợp này, chúng ta chỉ muốn retry khi nhận được một phản hồi không thành công (mã trạng thái không phải 2xx).
        return response.status < 200 || response.status >= 300;
    }
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
    const originalRequest = error.config;

    // Xử lý lỗi 401 Unauthorized
    // if (error.response && error.response.status === 405) {
    //     // setTimeout(() => {
    //     //     window.location.reload();
    //     // }, 1000);
    //     console.log('Handling 405 error');
    //     // if (!originalRequest._retry) {
    //     //     originalRequest._retry = true;
    //     //     // Thêm logic làm mới token tại đây nếu cần
    //     //     // Ví dụ: await refreshAuthToken();

    //     //     // Cập nhật Authorization header với token mới nếu cần
    //     //     const newToken = localStorage.getItem("jwt");
    //     //     if (newToken) {
    //     //         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
    //     //     }
    //     //     return instance(originalRequest);
    //     // }
    // }

    // // Xử lý lỗi 401 
    if (error.response && error.response.status === 401) {
        console.log('Handling 401 error');
        store.dispatch({ type: actionTypes.PATIENT_LOGIN_FAILED });
        store.dispatch({ type: actionTypes.USER_LOGIN_FAIL });
        // Thêm logic xử lý lỗi 404 tại đây
        // Ví dụ: hiển thị thông báo lỗi hoặc chuyển hướng
    }

    // // Xử lý lỗi 405 Method Not Allowed
    // if (error.response && error.response.status === 405) {
    //     console.log('Handling 405 error');
    //     // Thêm logic xử lý lỗi 405 tại đây
    //     // Ví dụ: hiển thị thông báo lỗi hoặc chuyển hướng
    // }

    // // Xử lý lỗi 400 Bad Request
    // if (error.response && error.response.status === 400) {
    //     console.log('Handling 400 error');
    //     // Thêm logic xử lý lỗi 400 tại đây
    //     // Ví dụ: hiển thị thông báo lỗi hoặc chuyển hướng
    // }
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
