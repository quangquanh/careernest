import axios from '../setup/axios';

const getAllResumesByUser = () => {
    return axios.get(`/online-resumes-user`);
};

const getMainResumeUpload = (fileName = '', folder = '') => {
    return axios.get(`/files`, {
        params: { fileName, folder },
        responseType: 'blob'  // 👈 Giúp axios trả về file dưới dạng blob
    });
};

const getResumesByJob = (jobId) => {
    return axios.get(`/resumes/job/${jobId}`);
};

const postCreateOnlineCV = (data) => {
    return axios.post('/online-resumes', { ...data });
}

const postApplyJob = (data) => {
    const formData = new FormData();
    formData.append('folder', data.folder);
    formData.append('file', data.file); // Gửi tệp
    formData.append('email', data.email);
    formData.append('userId', data.userId);
    formData.append('jobId', data.jobId);
    formData.append('advantage', data.advantage);
    formData.append('shortcoming', data.shortcoming);
    formData.append('rating', data.rating);

    return axios.post('/resumes', formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // Đảm bảo header đúng
        }
    });
}

const putUpdateOnlineResume = (data) => {
    return axios.put(`/online-resumes`, { ...data })
};

const putUpdateResume = (data) => {
    return axios.put(`/resumes`, { ...data })
};

const deleteOnlResume = (id) => {
    return axios.delete(`/online-resumes/${id}`);
}


export {
    getAllResumesByUser, getMainResumeUpload, getResumesByJob, postCreateOnlineCV,
    putUpdateOnlineResume, putUpdateResume, postApplyJob, deleteOnlResume
};