import { MessageDto, UserDto } from '../types';

export const useGetUserFromRow = (row: MessageDto): UserDto => {
      return row.user;
};
