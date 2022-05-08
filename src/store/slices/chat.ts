import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ChatState, CreateMessageDto} from "../../types";
import {ChatService} from "../../services/ChatService";
import {RootState} from "../index";
import MessageService from "../../services/MessageService";

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
);

export const fetchChat = createAsyncThunk(
    'chat/fetchChat',
    async (hash: string, {dispatch, getState}) => {
        try {
            const {chat} = getState() as RootState;
            const foundChat = chat.chats.find(({user}) => user.hash === hash);

            if (!foundChat) {
                const {data} = await ChatService.getChat(hash);
                dispatch(setChat(data.data));
            } else {
                dispatch(setChat(foundChat));
            }

        } catch (e) {
            console.log(e)
        }
    },
);

export const findChat = createAsyncThunk(
    'chat/findChat',
    async (search: string, {dispatch}) => {
        try {
            const {data} = await ChatService.search(search);
            dispatch(setChats(data.data));
        } catch (e) {
            console.log(e)
        }
    }
)

export const sendMessage = createAsyncThunk(
    'message/sendMessage',
    async (createMessageDto: CreateMessageDto, {dispatch, getState}) => {
        try {
            const {data} = await MessageService.create(createMessageDto);
            dispatch(addMessage(data.data));
        } catch (e) {
            console.log(e);
        }
    }
);

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

        addMessage(state, {payload}) {

            if (state.chat) {
                state.chat.messages = [...state.chat.messages, payload];
            }

            state.chats = state.chats.map(chat => {
                if (chat.id === state.chat?.id) {
                    return {...chat, messages: [...chat.messages, payload]}
                }
                return chat;
            });
        }

    }
})

export const {setChats, setChat, addMessage} = chatSlice.actions;

export default chatSlice.reducer;