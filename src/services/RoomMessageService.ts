import $api from "../http";

export class RoomMessageService {

    static async create(fd: FormData) {
        return await $api.post('/room-message/create', fd);
    }

}