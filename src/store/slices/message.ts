import {createSlice} from "@reduxjs/toolkit";
import {MessageState} from "../../types";

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

    }
})

export const {setMessages, addMessage} = messageSlice.actions;

export default messageSlice.reducer;