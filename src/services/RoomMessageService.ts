import $api from "../http";

export class RoomMessageService {

    static async create(fd: FormData) {
        return await $api.post('/room-message/create', fd);
    }

    static async get(roomId: number, skip: number, take: number) {
        return await $api.get('/room-message/' + roomId, {params: {skip, take}})
    }

}