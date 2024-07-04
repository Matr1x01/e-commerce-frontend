import axios from "axios";
import {getCookie}  from "cookies-next";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

apiClient.interceptors.request.use(
    function (config) {
        const token = getCookie("authToken");
        console.log(token);
        if (typeof window !== "undefined") {
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error) {
        return Promise.reject(error);
    }
);
export const setAuthToken = (token) => {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
