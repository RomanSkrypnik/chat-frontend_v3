import $api from "../http";

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

}