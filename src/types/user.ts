export interface UserDto {
    id: number;
    email: string;
    username: string;
    name: string;
    avatar: string | null;
    activated: boolean;
}