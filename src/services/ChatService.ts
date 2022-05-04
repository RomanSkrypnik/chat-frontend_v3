import $api from "../http";

export class ChatService {

    static async getChats() {
        return $api.get('/message/get-messages');
    }

}