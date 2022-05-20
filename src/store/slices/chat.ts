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
            const {chat: {take, chat}} = getState() as RootState;

            if (!chat?.allMessagesFetched) {
                const {data} = await MessageService.get(chatId, chat?.skip ?? 40, take);
                dispatch(addOlderMessages(data.data))
            }
        } catch (e) {
            throw e;
        }
    }
);

const initialState: ChatState = {
    chat: null,
    chats: [],
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

        changeUser(state, {payload}) {

            if (state.chat && state.chat.user.id === payload.id) {
                state.chat.user = payload;
            }

            state.chats = state.chats.map(chat => {
                if (chat.user.id === payload.id) {
                    chat.user = payload;
                }
                return chat;
            });
        },

        changeChat(state, {payload}) {

            if (state.chat && state.chat.id === payload.id) {
                state.chat = payload;
            }

            state.chats = state.chats.map(chat => {
                if (chat.id === payload.id) {
                    return payload;
                }
                return chat;
            })
        },

        addMessage(state, {payload}) {
            const {chatId} = payload;

            if (state.chat && state.chat.id === chatId) {
                state.chat.messages = [payload, ...state.chat.messages];
            }

            state.chats = state.chats.map(chat => {
                if (chat.id === chatId) {
                    return {...chat, messages: [payload, ...chat.messages]};
                }
                return chat;
            });
        },

        addOlderMessages(state, {payload}) {
            const {messages, ...chat} = payload;
            const {chatId} = messages[0];

            if (state.chat && state.chat.id === chatId) {
                state.chat = {
                    ...state.chat,
                    ...chat,
                    messages: [...state.chat.messages, ...messages]
                };
            }

            state.chats = state.chats.map(stateChat => {
                if (stateChat.id === chatId) {
                    return {
                        ...stateChat,
                        ...chat,
                        messages: [...stateChat.messages, ...messages]
                    };
                }
                return stateChat;
            });
        },

    }
})

export const {
    setChats,
    setChat,
    changeUser,
    changeMessage,
    changeChat,
    addMessage,
    addOlderMessages
} = chatSlice.actions;

export default chatSlice.reducer;