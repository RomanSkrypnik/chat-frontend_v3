import {MessageDto} from "./message";
import {UserDto} from "./user";

export interface ChatState {
    chat: ChatDto | null;
    chats: ChatDto[] | [];
}

export interface ChatDto {
    id?: number;
    user: UserDto;
    messages: MessageDto[];
}