import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';
export const SERVER_URL = 'http://localhost:5000';

export const ROOM_AVATAR_URL = SERVER_URL + '/room/avatar/';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

$api.interceptors.request.use(config => {
    if (config?.headers) {
        config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    }
});

export default $api;
