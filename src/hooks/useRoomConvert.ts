import { RoomDto } from '../types';
import { useStorageUrl } from './useStorageUrl';

export function useRoomConvert(rooms: RoomDto[]) {
    const path = useStorageUrl('/room/avatar/');
    return rooms.map(({ name, avatar, id, hash, messages }) => ({
        name,
        src: avatar ? path + avatar : undefined,
        id,
        hash,
        messages,
    }));
}
