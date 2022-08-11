import { UserService } from '../services';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from './useSnackbar';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../types';

export function useComparePassword() {
    const { snackbar } = useSnackbar();

    const compare = async (password: string) => {
        return await UserService.comparePassword(password);
    };

    const onError = (e: AxiosError<ApiErrorResponse>) => {
        snackbar(e.response?.data.message);
    };

    return useMutation(compare, { onError });
}
