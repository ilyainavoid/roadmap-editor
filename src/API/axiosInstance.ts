import axios from 'axios';
import {getAccessToken} from "../Helpers/authHelpers.ts";

const axiosInstance = axios.create({
    /*baseURL: '',*/
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;