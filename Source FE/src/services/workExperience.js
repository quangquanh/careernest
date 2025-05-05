import axios from '../setup/axios';

const postCreateWorkExperience = (data) => {
    return axios.post('/workExperiences', { ...data });
}

const putUpdateWorkExperience = (data) => {
    return axios.put('/workExperiences', { ...data });
}

const deleteWorkExperience = (id) => {
    return axios.delete(`/workExperiences/${id}`);
}

export { postCreateWorkExperience, putUpdateWorkExperience, deleteWorkExperience };