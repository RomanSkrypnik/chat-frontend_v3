import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import { createRoom } from '../../store/slices/room';
import TextInput from '../inputs/TextInput';
import TextAreaInput from '../inputs/TextAreaInput';
import AvatarInput from '../inputs/AvatarInput';
import { CardContainer, DialContainer } from '../containers';
import { RegularButton } from '../ui';

interface RoomFormProps {
    onClose: () => void;
}

interface FormValues {
    name: string;
    description: string;
}

export const RoomForm: FC<RoomFormProps> = ({ onClose }) => {
    const [file, setFile] = useState<[] | File>([]);

    const { handleSubmit, control } = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const onSubmit = (data: FormValues) => {
        const fd = new FormData();

        fd.append('name', data.name);
        fd.append('description', data.description);

        if (file) {
            fd.append('avatar', file as Blob);
        }

        dispatch(createRoom(fd));

        onClose();
    };

    const handleChange = (file: File) => {
        setFile(file);
    };

    return (
        <DialContainer className='w-25' onClose={onClose}>
            <CardContainer title='Create new room' onClose={onClose}>
                <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit(onSubmit)}>

                    <div className='d-flex align-items-center w-100 mb-3'>
                        <AvatarInput onChange={handleChange} />
                        <TextInput className='flex-grow-1 ms-3' placeholder='Name' defaultValue='' control={control}
                                   name='name' />
                    </div>

                    <TextAreaInput className='mb-3' control={control} name='description' placeholder='Description' />
                    <RegularButton type='submit' className='mt-3'>Create</RegularButton>
                </form>
            </CardContainer>
        </DialContainer>
    );
};
