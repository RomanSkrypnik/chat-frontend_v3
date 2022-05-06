import {MessageDto} from "../types";
import {useEffect, useState} from "react";

export function useMessageArr(messages: MessageDto[]) {

    const [twoDimsArr, setTwoDimsArr] = useState<[] | MessageDto[][]>([])

    useEffect(() => {
        convertIntoTwoDimsArr()
    }, [messages]);

    const convertIntoTwoDimsArr = () => {
        const arr: [] | MessageDto[][] = []
        let i = 0

        messages.forEach((message, idx) => {
            if (idx > 0 && message.user.id !== messages[idx - 1].user.id) {
                i++
            }
            arr[i] = arr[i] ? [...arr[i], message] : [message]
        })

        setTwoDimsArr(arr)
    }

    return twoDimsArr
}