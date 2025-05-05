import axios from '../setup/axios';

const postLogin = (data) => {
    return axios.post('/auth/login', { ...data });
}

const putChangePassword = (data) => {
    return axios.put('/auth/change-password', { ...data });
}

const postRegister = (data) => {
    return axios.post('/auth/register', { ...data });
}

const postCreateNewUser = (data) => {
    return axios.post('/users', { ...data });
}

const postUploadMainCV = (data) => {
    const formData = new FormData();
    formData.append('folder', data.folder);
    formData.append('file', data.file); // Gửi tệp
    return axios.post('/users/main-resume', formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // Đảm bảo header đúng
        }
    });
}

const postSaveJob = ({ userId, jobId }) => {
    return axios.post(`/users/saveJob/${userId}/${jobId}`);
}

const postLogout = () => {
    return axios.post('/auth/logout');
}

const getAllUsers = () => {
    return axios.get(`/users`);
}

const getDetailUser = (id) => {
    return axios.get(`/users/${id}`);
}

const putUpdateUser = (data) => {
    return axios.put(`/users`, { ...data })
};

const getAllAppliedJobs = (id) => {
    return axios.get(`/resumes/user/${id}`);
}

const deleteUser = (id) => {
    return axios.delete(`/users/${id}`);
}

export {
    postLogin, postUploadMainCV, putChangePassword, postRegister, postCreateNewUser, postLogout, getAllUsers, getDetailUser, putUpdateUser, deleteUser,
    postSaveJob, getAllAppliedJobs
};