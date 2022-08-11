import { MessageDto } from '../types';
import { useEffect, useState } from 'react';

export function useLastMessage(array: MessageDto[][]) {
    const [lastMessage, setLastMessage] = useState<null | MessageDto>(null);

    useEffect(() => {
        if (array.length > 0) {
            const i = array.length - 1;
            const j = array[i].length - 1;

            setLastMessage(array[i][j]);
        } else {
            setLastMessage(null);
        }
    }, [array]);

    return lastMessage;
}

