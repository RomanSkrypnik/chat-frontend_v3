import { isEqual } from 'date-fns';

export const useDateCompare = (date: string, previousDate: string | null) => {

    if (previousDate) {
        const leftDate = new Date(date).setHours(0, 0, 0, 0);
        const rightDate = new Date(previousDate).setHours(0, 0, 0, 0);

        console.log(leftDate);
        console.log(rightDate);

        return isEqual(leftDate, rightDate);
    }

    return false;
};
