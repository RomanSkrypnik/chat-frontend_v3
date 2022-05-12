import React, {ChangeEvent, forwardRef} from 'react';

interface FileInputProps {
    onChange: (files: FileList) => void;
    value?: '';
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({onChange, value = ''}, ref) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files) {
            onChange(e.target.files);
        }
    }

    return (
        <input multiple={true} ref={ref} className="file-input" onChange={handleChange} type="file" value={value}/>
    );
});

export default FileInput;