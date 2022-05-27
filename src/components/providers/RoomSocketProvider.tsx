import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {useAppDispatch} from "../../store";
import {addMessage, addUser, changeMessage, changeUser} from "../../store/slices/room";
import {JoinLeaveRoomDto, RoomMessageDto} from "../../types/room";
import {UserDto} from "../../types";

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
            socket.on('login', (data: UserDto) => {
                // dispatch()
            });

            socket.on('join', (data: JoinLeaveRoomDto) => {
                dispatch(addUser(data));
            });

            socket.on('leave', (data: JoinLeaveRoomDto) => {
                dispatch(changeUser(data));
            });

            socket.on('room-message', (data: RoomMessageDto) => {
                dispatch(addMessage(data));
            });

            socket.on('read-message', (data: RoomMessageDto) => {
                dispatch(changeMessage(data));
            });

            return () => {
                socket.disconnect();
            }

        }
    }, [socket]);


    return (
        <RoomSocketContext.Provider value={socket}>
            {children}
        </RoomSocketContext.Provider>
    );
};

export default RoomSocketProvider;