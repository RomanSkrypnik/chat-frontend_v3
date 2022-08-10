import $api from '../http';
import { RegisterDto, LoginDto } from '../types';

export class AuthService {

    static async register(registerDto: RegisterDto) {
        return await $api.post('/auth/register', registerDto);
    }

    static async login(loginDto: LoginDto) {
        return await $api.post('/auth/login', loginDto);
    }

    static async refresh() {
        return await $api.get('/auth/refresh');
    }

    static async logout() {
        return await $api.get('/auth/logout');
    }

}
