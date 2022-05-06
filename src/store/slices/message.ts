import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CreateMessageDto, MessageState} from "../../types";
import MessageService from "../../services/MessageService";
import {RootState} from "../index";
import {setChat} from "./chat";

export const sendMessage = createAsyncThunk(
    'message/sendMessage',
    async (createMessageDto: CreateMessageDto, {dispatch, getState}) => {
        try {
            const {data} = await MessageService.create(createMessageDto);
            const {chat} = getState() as RootState;

            dispatch(addMessage(data.data));

            if (chat.chat) {
                const messages = chat.chat && [...chat.chat.messages, data.data];
                dispatch(setChat({...chat.chat, messages}))
            }
        } catch (e) {
            console.log(e);
        }
    }
)

export const initialState: MessageState = {
    messages: [],
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {

        setMessages(state, {payload}) {
            state.messages = payload;
        },

        addMessage(state, {payload}) {
            state.messages = [...state.messages, payload]
        }

    },
})

export const {setMessages, addMessage} = messageSlice.actions;

export default messageSlice.reducer;