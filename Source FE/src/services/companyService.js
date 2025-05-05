import axios from '../setup/axios';

const getAllCompanies = (page = 1) => {
    if (page && page > 1)
        return axios.get(`/companies?page=${page}`);
    return axios.get(`/companies`);
};

const getDetailCompany = (id) => {
    return axios.get(`/companies/${id}`);
}

const postCreateNewCompany = (data) => {
    return axios.post('/companies', { ...data });
}

const putUpdateCompany = (data) => {
    return axios.put('/companies', { ...data });
}

const deleteCompany = (id) => {
    return axios.delete(`/companies/${id}`);
}

export { getAllCompanies, getDetailCompany, postCreateNewCompany, putUpdateCompany, deleteCompany };