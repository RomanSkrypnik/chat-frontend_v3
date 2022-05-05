import $api from "../http";

export class ChatService {

    static async getChats() {
        return await $api.get('/chat');
    }

    static async getChat(hash: string) {
        return await $api.get('/chat/' + hash)
    }

}