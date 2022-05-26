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

            if (state.room && state.room?.id === roomId) {
                const userIdx = state.room.users.findIndex(roomUser => roomUser.id === user.id);

                if (userIdx === -1) {
                    state.room.users = [...state.room.users, user];
                }
            }

            const roomIdx = state.rooms.findIndex(room => room.id === roomId);
            const userIdx = state.rooms[roomIdx].users.findIndex(roomUser => roomUser.id === user.id);

            if (userIdx === -1) {
                state.rooms[roomIdx].users = [...state.rooms[roomIdx].users, user];
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
        }

    }
})

export const {setRooms, setRoom, addRoom, addUser, addMessage} = roomSlice.actions;

export default roomSlice.reducer;