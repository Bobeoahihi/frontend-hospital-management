
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

export {
    handleLoginApi, getAllUsers,
    createNewuserService, deleteUserService,
    editUserService
}
