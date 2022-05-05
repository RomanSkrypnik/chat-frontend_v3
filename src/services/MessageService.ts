import {CreateMessageDto} from "../types";
import $api from "../http";

export default class MessageService {

    async create(messageDto: CreateMessageDto) {
        return await $api.post('/message/create', messageDto);
    }

}