import {FileDto} from "../types";
import {useEffect, useState} from "react";

export function useFileCount(files: FileDto[]) {
    const [fileCount, setFileCount] = useState(0);
    const [pictureCount, setPictureCount] = useState(0);

    useEffect(() => {
        count();
    }, []);

    useEffect(() => {
        count();
    }, [files]);

    const count = () => {
        const {length} = files.filter(file => file.ext === 'docx' || file.ext === 'zip');
        const pictureCount = files.length - length;

        setFileCount(length);
        setPictureCount(pictureCount);
    }

    return {fileCount, pictureCount};
}