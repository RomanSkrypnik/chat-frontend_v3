import { useMutation, useQuery } from '@tanstack/react-query';
import { UserService } from '../services';

const fetchUsers = async () => {
    return await UserService.users();
};

const fetchUsersBySearch = async ({ search }: { search: string }) => {
    return await UserService.usersBySearch(search);
};

export const useFetchUsers = () => {
    return useQuery(['users'], fetchUsers);
};

export const useFetchUsersBySearch = () => {
    return useMutation(['users'], fetchUsersBySearch);
};
