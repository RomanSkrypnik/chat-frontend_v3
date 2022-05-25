import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RoomState} from "../../types/room";
import {RoomService} from "../../services/RoomService";

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
    async (hash: string, {dispatch}) => {
        try {
            const {data} = await RoomService.getOne(hash);
            dispatch(setRoom(data.data));
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
    skip: 0
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
        }

    }
})

export const {setRooms, setRoom, addRoom} = roomSlice.actions;

export default roomSlice.reducer;