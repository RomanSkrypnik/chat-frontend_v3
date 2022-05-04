import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthState, LoginDto} from "../../types/auth";
import {AuthService} from "../../services/AuthService";

export const refresh = createAsyncThunk(
    'auth/refresh',
    async (_, {dispatch}) => {
        try {
            const {data} = await AuthService.refresh();
            const {accessToken} = data.data.tokens;

            localStorage.setItem('accessToken', accessToken);

            dispatch(authenticate(data.data.user))
        } catch (e) {
            dispatch(setIsLoaded(true))
            console.log(e)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginDto, {dispatch}) => {
        try {
            const {data} = await AuthService.login(loginData);
            const {accessToken} = data.data.tokens;

            localStorage.setItem('accessToken', accessToken);

            dispatch(authenticate(data.data.user))
        } catch (e) {
            dispatch(setIsLoaded(true))
            console.log(e);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {dispatch}) => {
        try {
            await AuthService.logout();
            dispatch(exit())
        } catch (e) {
            console.log(e);
        }
    }
);

const initialState: AuthState = {
    user: {},
    isLogged: false,
    isLoaded: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        authenticate(state, {payload}) {
            state.user = payload;
            state.isLogged = true;
            state.isLoaded = true;
        },

        exit(state) {
            state.user = {};
            state.isLogged = false;
        },

        setIsLoaded(state, {payload}) {
            state.isLoaded = payload
        }

    }
})

export const {authenticate, exit, setIsLoaded} = authSlice.actions;

export default authSlice.reducer;