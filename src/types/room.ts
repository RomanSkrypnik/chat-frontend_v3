import {UserDto} from "./user";
import {FileDto} from "./file";
import {MessageDto} from "./message";

export interface RoomState {
    rooms: RoomDto[];
    room: null | RoomDto;
    take: number;
}

export interface RoomDto {
    id: number;
    name: string;
    description: string;
    hash: string;
    avatar: null | string;
    skip: number;
    roomId: number;
    messages: MessageDto[];
    users: UserDto[];
    files: FileDto[];
    isLoaded: boolean;
}

export interface RoomFileDto {
    id: number
    filename: string
    ext: string
    messageId: number
}

export interface RoomMessageDto {
    id: number;
    roomId: number;
    text: string;
    isRead: boolean;
    user: UserDto;
    files: [] | RoomFileDto[];
    createdAt: string;
}