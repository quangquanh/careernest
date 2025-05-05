import axios from '../setup/axios';

const getRefreshToken = () => {
    return axios.get(`/auth/refresh`);
}

export { getRefreshToken };