import axios from '../setup/axios';

const getAllComments = (companyId, currentPage, pageSize) => {
    return axios.get(`/comments/${companyId}?page=${currentPage}&pageSize=${pageSize}`);
}
const postWriteComment = (data) => {
    return axios.post('/comments', { ...data });
}

export { getAllComments, postWriteComment };