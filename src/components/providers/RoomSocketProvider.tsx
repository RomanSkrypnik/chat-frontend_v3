import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {useAppDispatch} from "../../store";
import {addMessage, addUser} from "../../store/slices/room";
import {JoinRoomDto, RoomMessageDto} from "../../types/room";

interface RoomSocketProviderProps {
    children: ReactNode;
}

export const RoomSocketContext = createContext<null | Socket<any, any>>(null);

const RoomSocketProvider: FC<RoomSocketProviderProps> = ({children}) => {
    const [socket, setSocket] = useState<null | Socket<any, any>>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socket) {
            setSocket(io('localhost:5000/room', {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        }
                    }
                }
            }));
        }
    }, []);


    useEffect(() => {
        if (socket) {

            socket.on('join', (data: JoinRoomDto) => {
                dispatch(addUser(data));
            });

            socket.on('room-message', (data: RoomMessageDto) => {
                dispatch(addMessage(data));
            })
        }
    }, [socket]);


    return (
        <RoomSocketContext.Provider value={socket}>
            {children}
        </RoomSocketContext.Provider>
    );
};

export default RoomSocketProvider;