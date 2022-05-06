import {UserDto} from "./user";

export interface CreateMessageDto {
    text: string;
    file: null;
}

export interface MessageState {
    messages: MessageDto[]
}

export interface MessageDto {
    id: number;
    text: string;
    createdAt: string;
    user: UserDto;
}