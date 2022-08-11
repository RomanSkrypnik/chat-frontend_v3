import { ChatDto } from '../types';
import { useStorageUrl } from './useStorageUrl';

export function useChatConvert(chats: ChatDto[]) {
    const path = useStorageUrl('/avatars/');

    return chats.map(({ user: { name, hash, avatar }, id, messages }) => ({
        name,
        hash,
        id,
        messages,
        src: avatar ? path + avatar : undefined,
    }));
}
