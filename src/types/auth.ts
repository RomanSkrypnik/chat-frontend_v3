import {UserDto} from "./user";

export interface AuthState {
    user: UserDto | null;
    isLogged: boolean;
    isLoaded: boolean;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    username: string;
    name: string;
    password: string;
}