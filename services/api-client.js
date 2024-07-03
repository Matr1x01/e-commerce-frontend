import axios from "axios";

const env = process.env;
export const apiClient = axios.create({
    baseURL: env.BASE_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

export const setAuthToken = (token) => {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
