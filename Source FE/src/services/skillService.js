import axios from '../setup/axios';

const getAllSkills = () => {
    return axios.get(`/skills`);
};

const postCreateNewSkill = (data) => {
    return axios.post('/skills', { ...data });
}

export { getAllSkills, postCreateNewSkill };