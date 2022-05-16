import $api from "../http";
import {ChatDto, MessageDto} from "../types";

export class ChatService {

    static async getChats() {
        return await $api.get('/chat');
    }

    static async getChat(hash: string) {
        return await $api.get('/chat/' + hash)
    }

    static async search(search: string) {
        return await $api.post('/chat/search', {search});
    }

    // static addMessage(chats: ChatDto[], message: MessageDto, chatId: number) {
    //     return chats.map(chat => {
    //         if (chat.id === chatId) {
    //             return {...chat, messages: [...chat.messages, message]}
    //         }
    //         return chat;
    //     });
    // }

}