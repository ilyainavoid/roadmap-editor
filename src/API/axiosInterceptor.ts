import axiosInstance from "./axiosInstance.ts";
import axios from "axios";
import {getRefreshToken, setTokens} from "../Helpers/authHelpers.ts";

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

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = getRefreshToken()
            if (!refreshToken) {
                return Promise.reject(error);
            }

            return new Promise(function(resolve, reject) {
                axios
                    .post('api/user/refresh', { token: refreshToken })
                    .then(({ data }) => {
                        setTokens(data.access_token, data.refresh_token )
                        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
                        processQueue(null, data.access_token);
                        resolve(axiosInstance(originalRequest));
                    })
                    .catch(err => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .then(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);
