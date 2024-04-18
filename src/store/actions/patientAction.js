import actionTypes from './actionTypes';
import { postNewPatient, postLoginPatient, postEditPatient } from '../../services/userService';
import { toast } from 'react-toastify';
export const createNewPatient = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await postNewPatient(data);
            if (res && res.errCode === 0) {
                toast.success('Create account success. Using this new account to login')
                dispatch(savePatientSuccess());
            }
            else {
                if (res && res.errCode === 1) {
                    toast.error('Your email is already in used, pls try another email!')
                    dispatch(savePatientFailed());
                } else {
                    toast.error('Missing required parameter')
                    dispatch(savePatientFailed());
                }
            }
        } catch (e) {
            dispatch(savePatientFailed());
            console.log("fetchRoleStart Error", e)
        }
    }
}
export const savePatientSuccess = () => ({
    type: actionTypes.CREATE_PATIENT_SUCCESS
})
export const savePatientFailed = () => ({
    type: actionTypes.CREATE_PATIENT_FAILED
})

export const patientLogin = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await postLoginPatient(data);
            if (res && res.errCode === 0) {
                toast.success('Login success')
                dispatch(patientLoginSuccess(res.user));
            } else {
                if (res && res.errCode === -1) {
                    toast.error('Missing required parameter')
                    dispatch(patientLoginFail());
                }
                if (res && res.errCode === 1) {
                    toast.error(`Your's email isn't exist in your system. Pls try other email!`)
                    dispatch(patientLoginFail());
                }
                if (res && res.errCode === 2) {
                    toast.error(`User's not found`)
                    dispatch(patientLoginFail());
                }
                if (res && res.errCode === 3) {
                    toast.error(`Wrong password`)
                    dispatch(patientLoginFail());
                }
                else {
                    dispatch(patientLoginFail());
                }
            }
        } catch (e) {
            dispatch(patientLoginFail());
            console.log("patientLoginFail Error", e)
        }
    }
}

export const patientLoginSuccess = (patientInfo) => ({
    type: actionTypes.PATIENT_LOGIN_SUCCESS,
    patientInfo: patientInfo
})
export const patientLoginFail = () => ({
    type: actionTypes.PATIENT_LOGIN_FAILED
})

export const processPatientLogout = () => {
    return (dispatch, getState) => {
        try {
            toast.success('Logout successfully!')
            dispatch(patientLogoutSuccess())
        } catch (e) {
            console.log('logout error', e)
        }
    }
}
export const patientLogoutSuccess = () => ({
    type: actionTypes.PROCESS_PATIENT_LOGOUT
})

export const editAPatient = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('Check data edit', data)
            let res = await postEditPatient(data);
            if (res && res.errCode === 0) {
                toast.success('Update patient success')
                dispatch(editPatientSuccess(res.user));
            } else {
                dispatch(editPatientFailed());
            }
        } catch (e) {
            toast.error("Update user error!")
            dispatch(editPatientFailed());
            console.log("EditUserFailed Error", e)
        }
    }
}
export const editPatientSuccess = (patientInfo) => ({
    type: actionTypes.EDIT_PATIENT_SUCCESS,
    patientInfo: patientInfo
})
export const editPatientFailed = () => ({
    type: actionTypes.EDIT_PATIENT_FAILED
})