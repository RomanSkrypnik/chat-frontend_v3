import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from './useSnackbar';
import { UserService } from '../services';

export function useChangePassword() {

    const { snackbar } = useSnackbar();

    const change = async (password: string) => {
        return await UserService.changePassword(password);
    };

    const onError = (e: Error) => {
        snackbar(e.message);
    };

    return useMutation(change, { onError });
}
