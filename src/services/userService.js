
import axios from '../axios'
const handleLoginApi = (userEmail, userPassword) => {

    let data = JSON.stringify({
        email: userEmail,
        password: userPassword
    });
    return axios.post('/api/login', data, { headers: { "Content-Type": "application/json" } })

}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewuserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors')
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (inputId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${inputId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}
const postNewPatient = (data) => {
    return axios.post(`/api/create-new-patient`, data)
}
const postLoginPatient = (data) => {
    return axios.post(`/api/patient-login`, data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const editSpecialty = (data) => {
    return axios.put(`/api/edit-specialty`, data)
}
const deleteSpecialty = (specialtyId) => {
    return axios.delete(`/api/delete-specialty`, {
        data: {
            id: specialtyId,
        }
    })
}
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}
const getPatientById = (patientId) => {
    return axios.get(`api/get-patient-by-id?id=${patientId}`)
}

const postEditPatient = (data) => {
    return axios.post(`/api/handle-edit-patient`, data)
}
const getAllAppointmentHistory = (inputId) => {
    return axios.get(`api/get-all-booking-history?id=${inputId}`)
}
export {
    handleLoginApi, getAllUsers,
    createNewuserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getDetailInforDoctor,
    saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforDoctorById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty, getAllDetailSpecialtyById,
    createNewClinic, getAllClinic, getAllDetailClinicById,
    getAllPatientForDoctor, postSendRemedy, postNewPatient,
    postLoginPatient, getPatientById, postEditPatient,
    getAllAppointmentHistory, editSpecialty, deleteSpecialty
}
