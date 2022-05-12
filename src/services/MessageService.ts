import $api from "../http";

export default class MessageService {

    static async create(fd: FormData) {
        return await $api.post('/message/create', fd);
    }

}