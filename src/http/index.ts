import axios from "axios";

export const API_URL = "http://localhost:5000/api"
export const API_DOMAIN = API_URL.split('//')[1];

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

$api.interceptors.request.use(config => {
    if (config?.headers) {
        config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    }
});

export default $api;