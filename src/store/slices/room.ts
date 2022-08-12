import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { RoomMessageService, RoomService } from '../../services';
import { RoomState } from '../../types';

export const fetchRooms = createAsyncThunk(
    'room/fetchRooms',
    async (_, { dispatch }) => {
        try {
            const { data } = await RoomService.get();
            dispatch(setRooms(data.data));
        } catch (e) {
            throw e;
        }
    },
);

export const fetchRoom = createAsyncThunk(
    'room/fetchRoom',
    async (hash: string, { dispatch, getState }) => {
        try {
            const { room } = getState() as RootState;
            const foundRoom = room.rooms.find(room => room.hash === hash);

            if (!foundRoom) {
                const { data } = await RoomService.getOne(hash);
                dispatch(setRoom(data.data));
            } else {
                dispatch(setRoom(foundRoom));
            }
        } catch (e) {
            throw e;
        }
    },
);

export const createRoom = createAsyncThunk(
    'room/createRoom',
    async (fd: FormData, { dispatch }) => {
        try {
            const { data } = await RoomService.create(fd);
            dispatch(addRoom(data.data));
        } catch (e) {
            throw e;
        }
    },
);

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (chatId: number, { dispatch, getState }) => {
        try {
            const { room: { take, room } } = getState() as RootState;

            if (!room?.isLoaded) {
                const { data } = await RoomMessageService.get(chatId, room?.skip ?? 40, take);
                dispatch(addOlderMessages(data.data));
            }
        } catch (e) {
            throw e;
        }
    },
);

const initialState: RoomState = {
    rooms: [],
    room: null,
    take: 40,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {

        setRooms(state, { payload }) {
            state.rooms = payload;
        },

        setRoom(state, { payload }) {
            state.room = payload;
        },

        addRoom(state, { payload }) {
            state.rooms = [payload, ...state.rooms];
        },

        addMessage(state, { payload }) {
            const { roomId } = payload;

            if (state.room && state.room.id === roomId) {
                state.room.messages = [payload, ...state.room.messages];
            }

            state.rooms = state.rooms.map(room => {
                if (room.id === roomId) {
                    return { ...room, messages: [payload, ...room.messages] };
                }
                return room;
            });
        },

        addOlderMessages(state, { payload }) {
            const { messages, ...room } = payload;
            const { roomId } = messages[0];

            if (state.room && state.room.id === roomId) {
                state.room = {
                    ...state.room,
                    ...room,
                    messages: [...state.room.messages, ...messages],
                };
            }

            state.rooms = state.rooms.map(roomChat => {
                if (roomChat.id === roomId) {
                    return {
                        ...roomChat,
                        ...room,
                        messages: [...roomChat.messages, ...messages],
                    };
                }
                return roomChat;
            });
        },

        changeMessage(state, { payload }) {
            const { roomId, id } = payload;

            if (state.room && state.room.id === roomId) {
                state.room.messages = state.room.messages.map(message => {
                    if (message.id === id) {
                        return { ...message, ...payload };
                    }
                    return message;
                });
            }

            const roomIdx = state.rooms.findIndex(room => room.id === roomId);

            if (roomIdx !== -1) {
                state.rooms[roomIdx].messages = state.rooms[roomIdx].messages.map(message => {
                    if (message.id === id) {
                        return { ...message, ...payload };
                    }
                    return message;
                });
            }
        },

        changeUsers(state, { payload }) {

            if (state.room) {
                state.room.users = payload;

                state.rooms = state.rooms.map(room => {
                    if (room.id === state.room?.id) {
                        return { ...room, users: payload };
                    }
                    return room;
                });
            }

        },

        changeUser(state, { payload }) {
            const { roomId, user } = payload;

            if (state.room && state.room.id === roomId) {
                const userIdx = state.room.users.findIndex(({ id }) => id === user.id);

                if (userIdx !== -1) {
                    state.room.users[userIdx] = payload;
                }
            }

            const roomIdx = state.rooms.findIndex(({ id }) => id === roomId);
            const userIdx = state.rooms[roomIdx].users.findIndex(({ id }) => id === user.id);

            state.rooms[roomIdx].users[userIdx] = payload;
        },

        changeUserInRooms(state, { payload }) {
            const { id } = payload;

            if (state.room) {
                state.room.users = state.room.users.map(user => user.id === id ? payload : user);
            }

            state.rooms = state.rooms.map(room => {
                const users = room.users.map(user =>
                    user.id === id ? payload : user,
                );
                return { ...room, users };
            });
        },
    },
});

export const {
    setRooms,
    setRoom,
    addRoom,
    changeUsers,
    addMessage,
    changeMessage,
    changeUser,
    changeUserInRooms,
    addOlderMessages,
} = roomSlice.actions;

export default roomSlice.reducer;
