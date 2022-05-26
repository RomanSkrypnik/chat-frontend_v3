import {UserDto} from "./user";
import {FileDto} from "./file";
import {MessageDto} from "./message";

export interface RoomState {
    rooms: RoomDto[];
    room: null | RoomDto;
    skip: number;
}

export interface RoomDto {
    id: number;
    name: string;
    hash: string;
    avatar: null | string;
    roomId: number;
    messages: MessageDto[];
    users: UserDto[];
    files: FileDto[];
}

export interface JoinRoomDto {
    user: UserDto;
    roomId: number;
}

export interface RoomFileDto {
    id: number
    filename: string
    ext: string
    messageId: number
}

export interface RoomMessageDto {
    id: number
    roomId: number
    text: string
    user: UserDto
    files: [] | RoomFileDto[]
    createdAt: string
}