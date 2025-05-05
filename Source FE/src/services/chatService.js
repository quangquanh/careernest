import axios from '../setup/axiosChat';

const getUsersConnected = (id) => {
    return axios.get(`/users-connected?id=${id}`);
};

const getAllMessages = (senderId, recipientId) => {
    return axios.get(`/messages/${senderId}/${recipientId}`)
}

export { getUsersConnected,getAllMessages };