import axios from '../setup/axios';

const getAllSubscribersByEmail = (email) => {
    return axios.get(`/subscribers?email=${email}`);
};

const postCreateNewSubscriber = (data) => {
    return axios.post('/subscribers', { ...data });
}

export { getAllSubscribersByEmail, postCreateNewSubscriber };