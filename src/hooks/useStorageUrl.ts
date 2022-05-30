import {useEffect, useState} from "react";
import {SERVER_URL} from "../http";

export default function useStorageUrl(prefix: string, file: string | null | undefined) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (file) {
            const url = SERVER_URL + prefix + file;
            setUrl(url);
        }
    }, [file]);

    return url;
}