import { useEffect, useState } from 'react';
import { SERVER_URL } from '../http';

export function useStorageUrl(prefix: string, file?: string | null) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        let url = SERVER_URL + prefix;
        if (file) {
            url += file;
        }
        setUrl(url);
    }, [prefix]);

    return url;
}
