import React from 'react';
import CardContainer from "../containers/CardContainer";
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";
import Typography from "../common/Typography";
import RegularButton from "../ui/buttons/RegularButton";
import {useAppDispatch} from "../../store";
import {editPersonalData} from "../../store/slices/auth";
import {EditUserDto} from "../../types";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useSnackbar} from "../../hooks/useSnackbar";

const SettingsAccountForm = () => {

    const {control, handleSubmit} = useForm<EditUserDto>();

    const {user} = useTypedSelector(state => state.auth);

    const {snackbar} = useSnackbar();

    const dispatch = useAppDispatch();

    const onSubmit = (data: EditUserDto) => {
        dispatch(editPersonalData(data));
        snackbar('Personal data is successfully changed');
    }

    return (
        <CardContainer>
            <Typography as="h2" className="mb-4">Account Settings</Typography>
            {
                user &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex">
                        <div className="flex-grow-1 me-4">
                            <TextInput defaultValue={user.username}
                                       name="username"
                                       control={control}
                                       label="Username"
                            />
                            <TextInput defaultValue={user.email}
                                       name="email"
                                       control={control}
                                       label="Email"
                                       className="mt-3"
                            />
                        </div>
                        <div className="flex-grow-1">
                            <TextInput defaultValue={user.name}
                                       name="name"
                                       control={control}
                                       label="Name"
                            />
                            <TextInput
                                name="bio"
                                control={control}
                                label="Bio"
                                className="mt-3"
                            />
                        </div>
                    </div>
                    <RegularButton className="mt-4">Change data</RegularButton>
                </form>
            }
        </CardContainer>
    );
};

export default SettingsAccountForm;