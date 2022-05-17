import {format, formatDistance} from "date-fns";
import {useEffect, useState} from "react";

export function useFormatDate(date: string, dateFormat: string) {
    return format(new Date(date), dateFormat);
}

export function useFormatDuration(dateString: string) {
    const [date, setDate] = useState<null | string>(null);
    // TODO :: CHANGE TYPE
    const [dateInterval, setDateInterval] = useState<any>(null);

    useEffect(() => {
        formatDate();
    }, [dateString]);

    useEffect(() => {
        if (date) {
            dateInterval && clearInterval(dateInterval);

            const interval = setInterval(() => formatDate(), 30000);

            setDateInterval(interval);
        }
    }, [date]);

    const formatDate = () => {
        const date = formatDistance(new Date(dateString), new Date()) + ' ago';
        setDate(date);
    }

    return date;
}