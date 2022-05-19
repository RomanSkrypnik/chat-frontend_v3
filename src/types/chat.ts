import {MessageDto} from "./message";
import {UserDto} from "./user";

export interface ChatState {
    chat: ChatDto | null;
    chats: ChatDto[] | [];
    skip: number;
    take: number;
}

export interface ChatDto {
    id: number;
    user: UserDto;
    messages: MessageDto[];
    isBlockedByMe: boolean;
    isBlockedByCompanion: boolean;
    isMutedByMe: boolean;
    isMutedByCompanion: boolean;
}