import actionTypes from '../actions/actionTypes';

const initialState = {
    patientLoggined: false,
    patientInfo: null
}

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PATIENT_LOGIN_SUCCESS:
            return {
                ...state,
                patientLoggined: true,
                patientInfo: action.patientInfo
            }
        case actionTypes.PATIENT_LOGIN_FAILED:
            return {
                ...state,
                patientLoggined: false,
                patientInfo: null
            }
        case actionTypes.PROCESS_PATIENT_LOGOUT:
            return {
                ...state,
                patientLoggined: false,
                patientInfo: null
            }
        case actionTypes.EDIT_PATIENT_SUCCESS:
            return {
                ...state,
                patientInfo: action.patientInfo
            }
        default:
            return state;
    }
}

export default patientReducer;