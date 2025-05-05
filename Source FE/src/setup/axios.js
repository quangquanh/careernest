import axios from 'axios';
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { store } from '../redux/store';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    timeout: 10000
});

// Request interceptor
instance.interceptors.request.use(
    async function (config) {
        NProgress.start();
        const access_token = store?.getState()?.user?.access_token ?? '';
        if (access_token)
            config.headers['Authorization'] = `Bearer ${access_token}`;  //gán access_token mỗi lần gọi API
        return config;
    },
    function (error) {
        NProgress.done();
        // Xử lý lỗi trước khi request được gửi
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        NProgress.done();
        return response?.data ?? { statusCode: response.status, statusText: response.statusText };
    },

    async function (error) {
        NProgress.done();
        // Xử lý các lỗi liên quan đến token (hết hạn hoặc không hợp lệ)
        // if (error.response && error.response.data) {
        //     const errorCode = +error.response.data.EC;
        //     if (errorCode === -999) { // Token expired 
        //         const prevRequest = error.config;
        //         if (!prevRequest.sent) {
        //             prevRequest.sent = true;
        //             const access_token = await refreshAccessToken();
        //             if (access_token) {
        //                 prevRequest.headers['Authorization'] = `Bearer ${access_token}`;
        //                 return instance(prevRequest); // Retry request
        //             } else {
        //                 localStorage.removeItem("access_token");
        //                 localStorage.setItem("error_message_accessToken", error.response.data.EM);
        //                 window.location.href = "/sign-in";
        //             }
        //         }
        //     }
        //     if (errorCode === -1)  // Not authenticated user 
        //         localStorage.setItem("err_authenticate", error.response.data.EM);
        // }

        let res = {};
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response) {
            res.data = error.response.data;
            res.status = error.response.status;
            res.headers = error.response.headers;
        } else if (error.request) {
            toast.error(error.message);
            console.error("Error:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        return res;
    }
);

export default instance;
