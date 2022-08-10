import $api from '../http';

export class MessageService {

    static async create(fd: FormData) {
        return await $api.post('/message/create', fd);
    }

    static async get(chatId: number, skip: number, take: number) {
        return await $api.get('/message/' + chatId, { params: { skip, take } });
    }

}
