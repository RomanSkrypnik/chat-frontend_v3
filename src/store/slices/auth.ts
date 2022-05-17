import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthState, LoginDto} from "../../types";
import {AuthService} from "../../services/AuthService";

const rejectionReducer = (state: AuthState) => {
    state.isLoaded = true;
}

export const refresh = createAsyncThunk(
    'auth/refresh',
    async (_, {dispatch}) => {
        try {
            const {data} = await AuthService.refresh();
            const {accessToken} = data.data.tokens;

            localStorage.setItem('accessToken', accessToken);

            dispatch(authenticate(data.data.user))
        } catch (e) {
            throw e;
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginDto, {dispatch}) => {
        try {
            const {data} = await AuthService.login(loginData);
            const {accessToken} = data.data.tokens;

            localStorage.setItem('accessToken', accessToken);

            dispatch(authenticate(data.data.user))
        } catch (e) {
            throw e;
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {dispatch}) => {
        try {
            await AuthService.logout();
            dispatch(exit())
        } catch (e) {
            throw e;
        }
    }
);

const initialState: AuthState = {
    user: null,
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
            state.user = null;
            state.isLogged = false;
        },

    },
    extraReducers: (builder => {
        builder.addCase(refresh.rejected, rejectionReducer);
        builder.addCase(login.rejected, rejectionReducer);
    })
})

export const {authenticate, exit} = authSlice.actions;

export default authSlice.reducer;