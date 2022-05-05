import {format} from "date-fns";

export function useFormatDate(date: string, dateFormat: string) {
    return format(new Date(date), dateFormat);
}