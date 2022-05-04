import {UserDto} from "./user";

export interface MessageDto {
    id: number;
    text: string;
    user: UserDto;
}