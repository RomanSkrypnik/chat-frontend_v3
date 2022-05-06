import {CreateMessageDto, MessageDto} from "../types";
import $api from "../http";

export default class MessageService {

    static async create(messageDto: CreateMessageDto) {
        return await $api.post('/message/create', messageDto);
    }

}