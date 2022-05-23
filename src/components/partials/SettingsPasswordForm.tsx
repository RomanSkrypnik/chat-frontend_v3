import React from 'react';
import CardContainer from "../containers/CardContainer";
import Typography from "../common/Typography";
import TextInput from "../inputs/TextInput";
import RegularButton from "../ui/buttons/RegularButton";
import {useForm} from "react-hook-form";
import {UserService} from "../../services/UserService";
import {useSnackbar} from "../../hooks/useSnackbar";

interface FormValues {
    password: string;
    passwordConfirm: string;
    oldPassword: string;
}

const SettingsPasswordForm = () => {

    const {control, handleSubmit} = useForm<FormValues>();

    const {snackbar} = useSnackbar();

    const onSubmit = async (data: FormValues) => {
        try {
            await UserService.changePassword(data.password);
            snackbar('Password is successfully changed');
        } catch (e) {
            throw e;
        }
    }

    return (
        <CardContainer>
            <Typography as="h2" className="mb-4">Password Settings</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex">
                        <div className="flex-grow-1 me-4">
                            <TextInput name="oldPassword" control={control} label="Old password"/>
                            <TextInput name="password" control={control} label="New password"/>
                        </div>
                        <div className="flex-grow-1 align-self-end">
                            <TextInput name="passwordConfirm" control={control} label="Confirm new password"/>
                        </div>
                    </div>
                    <RegularButton className="mt-4">Change password</RegularButton>
                </form>

        </CardContainer>
    );
};

export default SettingsPasswordForm;