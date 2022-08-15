import {UserDto} from "./user";
import {FileDto} from "./file";

export interface CreateMessageDto {
    message: CreateMessageValues;
    hash: string;
}

export interface CreateMessageValues {
    text: string;
    files: File[] | null;
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

export interface MessageItemDto {
    id: number;
    src?: string;
    online?: boolean;
    name: string;
    hash: string;
    messages: MessageDto[];
}
