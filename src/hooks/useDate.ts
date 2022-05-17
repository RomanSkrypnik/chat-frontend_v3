import {format, formatDistance} from "date-fns";

export function useFormatDate(date: string, dateFormat: string) {
    return format(new Date(date), dateFormat);
}

export function useFormatDuration(date: string) {

    return formatDistance(new Date(date), new Date()) + ' ago';
}