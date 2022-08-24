import { isEqual } from 'date-fns';

export const useShowAvatar = (username: string, createdAt: string, prevUsername: string | null, prevCreatedAt: string | null) => {

    if (prevCreatedAt) {
        const leftDate = new Date(createdAt).setHours(0, 0, 0, 0);
        const rightDate = new Date(prevCreatedAt).setHours(0, 0, 0, 0);
        return username !== prevUsername || !isEqual(leftDate, rightDate);
    }

    return true;
};
