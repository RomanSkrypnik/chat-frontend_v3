export interface UserDto {
    id: number
    username: string
    name: string
    hash: string
    avatar: string | null
    online: boolean
}