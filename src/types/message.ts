import {UserDto} from "./user";

export interface CreateMessageDto {
    text: string;
    file: null;
}

export interface MessageDto {
    id: number;
    text: string;
    createdAt: string;
    user: UserDto;
}