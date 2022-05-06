import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ChatState} from "../../types";
import {ChatService} from "../../services/ChatService";
import {RootState} from "../index";

export const fetchChats = createAsyncThunk(
    'chat/fetchChats',
    async (_, {dispatch}) => {
        try {
            const {data} = await ChatService.getChats();
            dispatch(setChats(data.data));
        } catch (e) {
            console.log(e);
        }
    }
)

export const fetchChat = createAsyncThunk(
    'chat/fetchChat',
    async (hash: string, {dispatch}) => {
        try {
            const {data} = await ChatService.getChat(hash);
            dispatch(setChat(data.data))
        } catch (e) {
            console.log(e)
        }
    },
    {
        condition(hash: string, {getState}): boolean {
            const {chat} = getState() as RootState;
            return chat.chats.length <= 0;
        }
    }
)

const initialState: ChatState = {
    chat: null,
    chats: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

        setChat(state, {payload}) {
            state.chat = payload;
        },

        setChats(state, {payload}) {
            state.chats = payload;
        },

    }
})

export const {setChats, setChat} = chatSlice.actions;

export default chatSlice.reducer;