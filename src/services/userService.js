
import axios from '../axios'
//refresh_token
const refreshToken = () => {
    return axios.post('/api/refresh')
}
const deleteToken = () => {
    localStorage.clear()
    return axios.post('/api/clearToken')
}
const deleteTokenAdmin = () => {
    localStorage.clear()
    return axios.post('/api/clearTokenAdmin')
}

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
const getUserPaginate = (page, limit) => {
    return axios.get(`/api/get-user-paginate?page=${page}&limit=${limit}`)
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
const saveBulkSpecialtyClinic = (data) => {
    return axios.post(`/api/bulk-create-specialty`, data)
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
    return axios.post(`/api/patient-login`,
        {
            email: data.email,
            password: data.password,
        }
    )
}
const getAccountPatient = () => {
    return axios.get('/account')
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}
const getSpecialtyPaginate = (page, limit) => {
    return axios.get(`/api/get-specialty-paginate?page=${page}&limit=${limit}`)
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
const getClinicPaginate = (page, limit) => {
    return axios.get(`/api/get-clinic-paginate?page=${page}&limit=${limit}`)
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const editClinic = (data) => {
    return axios.put(`/api/edit-clinic`, data)
}
const deleteClinic = (clinicId) => {
    return axios.delete(`/api/delete-clinic`, {
        data: {
            id: clinicId,
        }
    })
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (dataAxios) => {
    //Tạo form để gửi file đi kèm
    const data = new FormData();
    data.append('file', dataAxios.selectedFile);

    // Append other data from JSON object to FormData
    Object.keys(dataAxios).forEach(key => {
        if (key !== 'file') {
            data.append(key, dataAxios[key]);
        }
    });
    return axios.post(`/api/send-remedy`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const downloadFileAttachment = (fileName) => {
    axios.get(`/api/get-file-appoinment?filename=${fileName}`, { responseType: 'arraybuffer', }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    })
        .catch(error => {
            console.error('Lỗi khi tải tệp', error);
        });
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
    getAllAppointmentHistory, editSpecialty, deleteSpecialty,
    editClinic, deleteClinic, saveBulkSpecialtyClinic, getClinicPaginate,
    refreshToken, deleteToken, downloadFileAttachment, getAccountPatient,
    getSpecialtyPaginate, getUserPaginate, deleteTokenAdmin,
}
