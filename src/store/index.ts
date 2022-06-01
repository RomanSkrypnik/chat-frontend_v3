import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import chatReducer from "./slices/chat";
import roomReducer from "./slices/room"
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        room: roomReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;