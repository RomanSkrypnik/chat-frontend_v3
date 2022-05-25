import React, {FC, useState} from 'react';
import CardContainer from "../containers/CardContainer";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../store";
import {createRoom} from "../../store/slices/room";
import TextInput from "../inputs/TextInput";
import FileInput from "../inputs/FileInput";
import RegularButton from "../ui/buttons/RegularButton";
import DialContainer from "../containers/DialContainer";

interface RoomFormProps {
    onClose: () => void;
}

interface FormValues {
    name: string;
}

const RoomForm: FC<RoomFormProps> = ({onClose}) => {
    const [file, setFile] = useState<[] | File>([]);

    const {handleSubmit, control} = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const onSubmit = (data: FormValues) => {
        const fd = new FormData();

        fd.append('name', data.name);

        if (file) {
            fd.append('avatar', file as Blob);
        }

        dispatch(createRoom(fd));

        onClose();
    };

    const handleChange = (files: File[]) => {
        setFile(files[0]);
    };

    return (
        <DialContainer onClose={onClose}>
            <CardContainer title="Create new room" onClose={onClose}>
                <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput className="mb-3" placeholder="Name" defaultValue="" control={control} name="name"/>
                    <FileInput visible onChange={handleChange}/>
                    <RegularButton type="submit" className="mt-3">Create</RegularButton>
                </form>
            </CardContainer>
        </DialContainer>
    );
};

export default RoomForm;