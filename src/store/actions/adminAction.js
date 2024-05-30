import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewuserService, getAllUsers, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,
    getAllSpecialty, getAllClinic, deleteSpecialty, editSpecialty, createNewSpecialty,
    createNewClinic, editClinic, deleteClinic,
} from '../../services/userService';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart Error", e)
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart Error", e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart Error", e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewuserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create user success')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }
            if (res && res.errCode === 1) {
                toast.error('Your email is already in used, pls try another email!')
                dispatch(saveUserFailed());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("fetchRoleStart Error", e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error('Fetch all user error!')
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersStart Error", e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH__ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId);
            // console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success('Delete user success!')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Delete user error!')
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("Delete-user Error", e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('Check data edit', data)
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update user success')
                dispatch(EditUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(EditUserFailed());
            }
        } catch (e) {
            toast.error("Update user error!")
            dispatch(EditUserFailed());
            console.log("EditUserFailed Error", e)
        }
    }
}
export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save detail doctor success')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                console.log('check res', res)
                toast.error('Save detail doctor failed!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error('Save detail doctor failed!')
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fetchRequiredDoctorInforFailed Error", e)
        }
    }

}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})

export const createANewSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewSpecialty(data);
            if (res && res.errCode === 0) {
                toast.success('Create specialty success')
                dispatch(saveSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            } else {
                toast.error('Create specialty failed')
                dispatch(saveSpecialtyFailed());
            }
        } catch (e) {
            dispatch(saveSpecialtyFailed());
            console.log("saveSpecialtyFailed Error", e)
        }
    }
}
export const saveSpecialtySuccess = () => ({
    type: actionTypes.CREATE_SPECIALTY_SUCCESS
})
export const saveSpecialtyFailed = () => ({
    type: actionTypes.CREATE_SPECIALTY_FAILED
})
export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.data.reverse()));
            } else {
                toast.error('Fetch all user error!')
                dispatch(fetchAllSpecialtyFailed());
            }
        } catch (e) {
            dispatch(fetchAllSpecialtyFailed());
            console.log("fetchAllUsersStart Error", e)
        }
    }
}
export const fetchAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    specialties: data
})
export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH__ALL_SPECIALTY_FAILED
})

export const deleteASpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteSpecialty(specialtyId);
            // console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success('Delete specialty success!')
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            } else {
                toast.error('Delete specialty error!')
                dispatch(deleteSpecialtyFailed());
            }
        } catch (e) {
            dispatch(deleteSpecialtyFailed());
            console.log("Delete-specialty Error", e)
        }
    }
}
export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS
})
export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED
})

export const editASpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('Check data edit', data)
            let res = await editSpecialty(data);
            if (res && res.errCode === 0) {
                toast.success('Update speacialty success')
                dispatch(EditSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            } else {
                dispatch(EditSpecialtyFailed());
            }
        } catch (e) {
            toast.error("Update specialty error!")
            dispatch(EditSpecialtyFailed());
            console.log("EditSpecialtyFailed Error", e)
        }
    }
}
export const EditSpecialtySuccess = () => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS
})
export const EditSpecialtyFailed = () => ({
    type: actionTypes.EDIT_SPECIALTY_FAILED
})

export const createANewClinic = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewClinic(data);
            if (res && res.errCode === 0) {
                toast.success('Create clinic success')
                dispatch(saveClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                toast.error('Create clinic failed')
                dispatch(saveClinicFailed());
            }
        } catch (e) {
            dispatch(saveSpecialtyFailed());
            console.log("saveClinicFailed Error", e)
        }
    }
}
export const saveClinicSuccess = () => ({
    type: actionTypes.CREATE_CLINIC_SUCCESS
})
export const saveClinicFailed = () => ({
    type: actionTypes.CREATE_CLINIC_FAILED
})
export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.data.reverse()));
            } else {
                toast.error('Fetch all clinic error!')
                dispatch(fetchAllClinicFailed());
            }
        } catch (e) {
            dispatch(fetchAllClinicFailed());
            console.log("fetchAllClinicStart Error", e)
        }
    }
}
export const fetchAllClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    clinics: data
})
export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH__ALL_CLINIC_FAILED
})

export const deleteAClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteClinic(clinicId);
            // console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success('Delete clinic success!')
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                toast.error('Delete clinic error!')
                dispatch(deleteClinicFailed());
            }
        } catch (e) {
            dispatch(deleteClinicFailed());
            console.log("Delete-clinic Error", e)
        }
    }
}
export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS
})
export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED
})

export const editAClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editClinic(data);
            if (res && res.errCode === 0) {
                toast.success('Update speacialty success')
                dispatch(EditClinicSuccess());
                dispatch(fetchAllClinicStart());
            } else {
                dispatch(EditClinicFailed());
            }
        } catch (e) {
            toast.error("Update clinic error!")
            dispatch(EditClinicFailed());
            console.log("EditClinicFailed Error", e)
        }
    }
}
export const EditClinicSuccess = () => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS
})
export const EditClinicFailed = () => ({
    type: actionTypes.EDIT_CLINIC_FAILED
})

// let res1 = await getTopDoctorHomeService(3);