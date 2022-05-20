import {MessageDto} from "./message";
import {UserDto} from "./user";

export interface ChatState {
    chat: ChatDto | null;
    chats: ChatDto[] | [];
    take: number;
}

export interface ChatDto {
    id: number;
    user: UserDto;
    messages: MessageDto[];
    skip: number;
    isMuted: boolean;
    isBlockedByMe: boolean;
    isBlockedByCompanion: boolean;
    allMessagesFetched: boolean;
}