import axios from '../setup/axios';

const getAllJobs = (page, name) => {
    if (page && page > 1) {
        if (name) return axios.get(`/jobs?page=${page}&name=${name}`);
        else
            return axios.get(`/jobs?page=${page}`);
    }
    else {
        if (name) return axios.get(`/jobs?name=${name}`);
        return axios.get('/jobs');
    }
}

// filterJobs({ 
//     page: 2, 
//     name: "Frontend Developer", 
//     location: ["New York", "Los Angeles"], 
//     level: ["Junior", "Mid"] 
// });
const filterJobs = ({ page = 1, pageSize = 4, name, location, level, salary }) => {
    // Kiểm tra page và pageSize hợp lệ, nếu không, gán giá trị mặc định
    if (page <= 0) page = 1;
    if (pageSize <= 0) pageSize = 6;

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("pageSize", pageSize);

    // Kiểm tra và thêm name vào query nếu có giá trị
    if (name) params.append("name", name);

    // Kiểm tra và thêm salary vào query nếu có giá trị
    if (salary) params.append("salary", salary);

    // Kiểm tra location có phải là mảng và thêm từng giá trị vào query
    if (Array.isArray(location) && location.length > 0) {
        location.forEach(loc => params.append("location", loc));
    }

    // Kiểm tra level có phải là mảng và thêm từng giá trị vào query
    if (Array.isArray(level) && level.length > 0) {
        level.forEach(lvl => params.append("level", lvl));
    }

    return axios.get(`/jobs?${params.toString()}`);
};

const getDetailJob = (id) => {
    return axios.get(`/jobs/${id}`);
}

const getJobsByCompany = (companyId, page, size = 6) => {
    return axios.get(`/jobs/company/${companyId}?page=${page}&size=${size}`);
}

const postCreateNewJob = (data) => {
    return axios.post('/jobs', { ...data });
}

const putUpdateJob = (data) => {
    return axios.put('/jobs', { ...data });
}

const deleteJob = (id) => {
    return axios.delete(`/jobs/${id}`);
}

export { getAllJobs, filterJobs, getDetailJob, getJobsByCompany, postCreateNewJob, putUpdateJob, deleteJob };