import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RoomState} from "../../types/room";
import {RoomService} from "../../services/RoomService";
import {RootState} from "../index";

export const fetchRooms = createAsyncThunk(
    'room/fetchRooms',
    async (_, {dispatch}) => {
        try {
            const {data} = await RoomService.get();
            dispatch(setRooms(data.data));
        } catch (e) {
            throw e;
        }
    }
);

export const fetchRoom = createAsyncThunk(
    'room/fetchRoom',
    async (hash: string, {dispatch, getState}) => {
        try {
            const {room} = getState() as RootState;
            const foundRoom = room.rooms.find(room => room.hash === hash);

            if (!foundRoom) {
                const {data} = await RoomService.getOne(hash);
                dispatch(setRoom(data.data));
            } else {
                dispatch(setRoom(foundRoom));
            }
        } catch (e) {
            throw e;
        }
    }
);

export const createRoom = createAsyncThunk(
    'room/createRoom',
    async (fd: FormData, {dispatch}) => {
        try {
            const {data} = await RoomService.create(fd);
            dispatch(addRoom(data.data));
        } catch (e) {
            throw e;
        }
    }
)

const initialState: RoomState = {
    rooms: [],
    room: null,
    skip: 0,
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {

        setRooms(state, {payload}) {
            state.rooms = payload;
        },

        setRoom(state, {payload}) {
            state.room = payload;
        },

        addRoom(state, {payload}) {
            state.rooms = [payload, ...state.rooms];
        },

        addUser(state, {payload}) {
            const {user, roomId} = payload;

            if (state.room && state.room.id === roomId) {
                const userIdx = state.room.users.findIndex(({id}) => id === user.id);

                if (userIdx === -1) {
                    state.room.users = [...state.room.users, user];
                } else {
                    state.room.users[userIdx] = user;
                }
            }

            const roomIdx = state.rooms.findIndex(({id}) => id === roomId);
            const userIdx = state.rooms[roomIdx].users.findIndex(({id}) => id === user.id);

            if (userIdx === -1) {
                state.rooms[roomIdx].users = [...state.rooms[roomIdx].users, user];
            } else {
                state.rooms[roomIdx].users[userIdx] = user;
            }
        },

        addMessage(state, {payload}) {
            const {roomId} = payload;

            if (state.room && state.room.id === roomId) {
                state.room.messages = [payload, ...state.room.messages];
            }

            state.rooms = state.rooms.map(room => {
                if (room.id === roomId) {
                    return {...room, messages: [payload, ...room.messages]};
                }
                return room;
            });
        },

        changeMessage(state, {payload}) {
            const {roomId, id} = payload;

            if (state.room && state.room.id === roomId) {
                state.room.messages = state.room.messages.map(message => {
                    if (message.id === id) {
                        return {...message, ...payload};
                    }
                    return message;
                });
            }

            const roomIdx = state.rooms.findIndex(room => room.id === roomId);

            if (roomIdx !== -1) {
                state.rooms[roomIdx].messages = state.rooms[roomIdx].messages.map(message => {
                    if (message.id === id) {
                        return {...message, ...payload};
                    }
                    return message;
                })
            }
        },

        changeUser(state, {payload}) {
            const {roomId, user} = payload;

            if (state.room && state.room.id === roomId) {
                const userIdx = state.room.users.findIndex(({id}) => id === user.id);

                if (userIdx !== -1) {
                    state.room.users[userIdx] = payload;
                }
            }

            const roomIdx = state.rooms.findIndex(({id}) => id === roomId);
            const userIdx = state.rooms[roomIdx].users.findIndex(({id}) => id === user.id);

            state.rooms[roomIdx].users[userIdx] = payload;
        },

        changeUserInRooms(state, {payload}) {
            const {rooms, id} = payload;
        }
        }
    });

export const {setRooms, setRoom, addRoom, addUser, addMessage, changeMessage, changeUser} = roomSlice.actions;

export default roomSlice.reducer;