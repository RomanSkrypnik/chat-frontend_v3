import React, {FC} from 'react';
import {FileDto} from "../../types";
import {useFileCount} from "../../hooks/useFileCount";

interface MessageItemAttachmentProps {
    files: FileDto[];
}

export const MessageItemFiles: FC<MessageItemAttachmentProps> = ({files}) => {

    const {fileCount, pictureCount} = useFileCount(files);

    return (
        <div className="d-flex">
            {fileCount > 0 && <div className="message-item__count _file">Files ({fileCount}x)</div>}
            {pictureCount > 0 && <div className="message-item__count _picture ms-2">Pictures ({pictureCount}x)</div>}
        </div>
    );
};
