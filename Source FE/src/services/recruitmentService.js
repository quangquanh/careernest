import axios from '../setup/axios';

const getAllRecruitment = (page = 1) => {
    if (page && page > 1)
        return axios.get(`/companies?page=${page}`);
    return axios.get(`/companies`);
}

const getDetailRecruitment = (id) => {
    return axios.get(`/companies/${id}`);

}

export { getAllRecruitment, getDetailRecruitment };