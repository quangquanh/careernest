import axios from '../setup/axios';

const getAllPermissions = () => {
    return axios.get(`/permissions`);
};

export { getAllPermissions, };