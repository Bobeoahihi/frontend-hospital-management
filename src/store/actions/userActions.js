import { deleteToken } from '../../services/userService';
import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

// export const processLogout = async () => {
//     return async (dispatch) => {
//         await deleteToken();
//         dispatch(logoutSuccess())
//     }

// }
export const processLogout = () => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteToken()
            // dispatch({ type: actionTypes.PROCESS_LOGOUT })
            dispatch(logoutSuccess())
        } catch (e) {
            console.log("fetchGenderStart Error", e)
        }
    }

}
export const logoutSuccess = () => ({
    type: actionTypes.PROCESS_LOGOUT
})