import $api from "../http";

export class RoomService {

    static async get() {
        return await $api.get('/room');
    }

    static async getOne(hash: string) {
        return await $api.get('/room/' + hash);
    }

    static async create(fd: FormData) {
        return await $api.post('/room', fd);
    }

}