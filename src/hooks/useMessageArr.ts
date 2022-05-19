import {MessageDto} from "../types";
import {useEffect, useState} from "react";

export function useMessageArr(messages: MessageDto[]) {
    const [twoDimsArr, setTwoDimsArr] = useState<[] | MessageDto[][]>([])

    useEffect(() => {
        convertIntoTwoDimsArr();
    }, [messages]);

    const convertIntoTwoDimsArr = () => {
        const arr: [] | MessageDto[][] = [];
        const reversed = [...messages].reverse();
        let i = 0;

        reversed.forEach((message, idx) => {
            if (idx > 0 && message.user.id !== reversed[idx - 1].user.id) {
                i++;
            }
            arr[i] = arr[i] ? [...arr[i], message] : [message];
        });

        setTwoDimsArr(arr);
    }

    return twoDimsArr;
}