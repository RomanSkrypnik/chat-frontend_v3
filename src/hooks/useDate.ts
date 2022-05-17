import {format, formatDistance} from "date-fns";
import {useEffect, useState} from "react";

export function useFormatDate(date: string, dateFormat: string) {
    return format(new Date(date), dateFormat);
}

export function useFormatDuration(dateString: string) {
    const [date, setDate] = useState<null | string>(null);

    useEffect(() => {
        formatDate();
    }, []);

    useEffect(() => {
        if (date) {
            setInterval(() => formatDate(), 30000);
        }
    }, [date]);

    const formatDate = () => {
        const date = formatDistance(new Date(dateString), new Date()) + ' ago';
        setDate(date);
    }

    return date;
}