import $api from "../http";
import {RegisterDto, LoginDto} from "../types/auth";

export class AuthService {

    static async register(data: RegisterDto) {
        return await $api.post('/auth/register', data);
    }

    static async login(data: LoginDto) {
        return await $api.post('/auth/login', data);
    }

    static async refresh() {
        return await $api.get('/auth/refresh');
    }

    static async logout() {
        return await $api.get('/auth/logout');
    }

}