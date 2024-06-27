import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens } from "../Helpers/authHelpers";
import store from "../Redux/store";
import { setAuth } from "../Redux/actions/authAction";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token && token !== "undefined") {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response.status === 401) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = getRefreshToken();
            if (!refreshToken || refreshToken === "undefined") {
                return Promise.reject(error);
            }

            try {
                const accessToken = getAccessToken();
                const { data } = await axios.post('/api/user/refresh', {
                    "AccessToken": accessToken,
                    "RefreshToken": refreshToken
                });
                console.log(data)
                setTokens(data.accessToken, data.refreshToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.AccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.AccessToken}`;
                processQueue(null, data.AccessToken);
                store.dispatch(setAuth(true));

                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                store.dispatch(setAuth(false));
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
