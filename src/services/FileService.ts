import $api from "../http";

export class FileService {

    static async upload(fd: FormData) {
        return await $api.post('file/upload', fd);
    }

}
