import {RoomDto} from "./room";

export interface UserState {
    users: [] | UserDto[];
    user: UserDto | null;
}

export interface UserDto {
    id: number;
    username: string;
    name: string;
    bio: string;
    hash: string;
    avatar: string | null;
    online: boolean;
    lastSeen: string;
    email: string;
    rooms?: RoomDto[];
    isInRoom?: boolean;
}

export interface EditUserDto {
    username: string;
    name: string;
    email: string;
    bio: string;
}