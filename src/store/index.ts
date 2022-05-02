import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;