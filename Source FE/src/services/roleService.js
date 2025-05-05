import axios from '../setup/axios';

const getAllRoles = () => {
    return axios.get(`/roles`);
};

const getDetailRole = (id) => {
    return axios.get(`/roles/${id}`);
}

const postCreateNewRole = (data) => {
    return axios.post('/roles', { ...data });
}

const putUpdateRole = (data) => {
    return axios.put('/roles', { ...data });
}

export { getAllRoles, getDetailRole, postCreateNewRole, putUpdateRole };