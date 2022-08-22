import { ChatDto } from '../types';
import { useStorageUrl } from './useStorageUrl';

export function useChatConvert(chats: ChatDto[]) {
    const path = useStorageUrl('/avatars/');

    return chats.map(({ user: { name, username, hash, avatar }, id, messages }) => ({
        username,
        name,
        hash,
        id,
        messages,
        src: avatar ? path + avatar : undefined,
    }));
}
