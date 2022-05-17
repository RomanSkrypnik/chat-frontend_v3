import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ChatState} from "../../types";
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
            throw e;
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
            throw e;
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
            throw e;
        }
    }
);

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (chatId: number, {dispatch, getState}) => {
        try {
            const {chat: {skip, take}} = getState() as RootState;
            const {data} = await MessageService.get(chatId, skip, take);
            dispatch(addMessages(data.data));
        } catch (e) {
            throw e;
        }
    }
)

const initialState: ChatState = {
    chat: null,
    chats: [],
    skip: 40,
    take: 40,
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

        changeMessage(state, {payload}) {

            if (state.chat && state.chat.id === payload.chatId) {
                const idx = state.chat.messages.findIndex(({id}) => id === payload.id);
                state.chat.messages[idx] = payload;
            }

            state.chats = state.chats.map(chat => {
                if (chat.id === payload.chatId) {
                    const idx = chat.messages.findIndex(({id}) => id === payload.id);
                    chat.messages[idx] = payload;
                }
                return chat;
            })
        },

        addMessage(state, {payload}) {

            if (state.chat && state.chat.id === payload.chatId) {
                state.chat.messages = [...state.chat.messages, payload];
            }

            state.chats = state.chats.map(chat => {
                if (chat.id === chat?.id) {
                    return {...chat, messages: [...chat.messages, payload]}
                }
                return chat;
            });
        },

        addMessages(state, {payload}) {

            if (state.chat && state.chat.id === payload.chatId) {
                state.chat.messages = [...state.chat.messages, ...payload];
            }

            state.chats = state.chats.map(chat => {
                if (chat.id === state.chat?.id) {
                    return {...chat, messages: [...chat.messages, ...payload]}
                }
                return chat;
            });
        }

    }
})

export const {setChats, setChat, changeMessage, addMessage, addMessages} = chatSlice.actions;

export default chatSlice.reducer;