import axios from '../setup/axios';

const getAllStatistic = () => {
    return axios.get(`/admin/statistic`);
};

export { getAllStatistic };