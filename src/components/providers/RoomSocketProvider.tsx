import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {useAppDispatch} from "../../store";
import {addMessage, changeMessage, changeUserInRooms, changeUsers} from "../../store/slices/room";
import {RoomMessageDto} from "../../types/room";
import {UserDto} from "../../types";

interface RoomSocketProviderProps {
    children: ReactNode;
}

export const RoomSocketContext = createContext<null | Socket<any, any>>(null);

export const RoomSocketProvider: FC<RoomSocketProviderProps> = ({children}) => {
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
                dispatch(changeUserInRooms(data));
            });

            socket.on('logout', (data: UserDto) => {
                dispatch(changeUserInRooms(data));
            });

            socket.on('join', (data: UserDto[]) => {
                dispatch(changeUsers(data));
            });

            socket.on('leave', (data: UserDto[]) => {
                dispatch(changeUsers(data));
            });

            socket.on('room-message', (data: RoomMessageDto) => {
                dispatch(addMessage(data));
            });

            socket.on('read-message', (data: RoomMessageDto) => {
                dispatch(changeMessage(data));
            });

            // TODO :: :\
            return () => {
                setTimeout(() => {
                    socket.disconnect();
                }, 600)
            }

        }
    }, [socket]);


    return (
        <RoomSocketContext.Provider value={socket}>
            {children}
        </RoomSocketContext.Provider>
    );
};
