import $api from "../http";
import {EditUserDto} from "../types";

export class UserService {

    static async user(hash: string) {
        return await $api.get('/user/' + hash);
    }

    static async users() {
        return await $api.get('/user');
    }

    static async usersBySearch(search: string) {
        return await $api.post('/user', {search});
    }

    static async edit(editUserDto: EditUserDto) {
        return await $api.post('/user/edit', editUserDto);
    }

    static async changePassword(password: string) {
        return await $api.post('/user/change-password', {password})
    }

}