import $api from "../http";

export class BlockedService {

    async block(userId: number) {
        return await $api.get('/blocked/' + userId);
    }

}