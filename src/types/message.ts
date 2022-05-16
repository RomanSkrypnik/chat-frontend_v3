import {UserDto} from "./user";
import {FileDto} from "./file";

export interface CreateMessageDto {
    message: CreateMessageValues;
    hash: string;
}

export interface CreateMessageValues {
    text: string;
    files: File[] | [];
}

export interface MessageState {
    messages: MessageDto[]
}

export interface MessageDto {
    id: number;
    text: string;
    createdAt: string;
    user: UserDto;
    files: FileDto[];
    chatId: number;
    isRead: boolean;
}