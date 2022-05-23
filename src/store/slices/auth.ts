import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthState, EditUserDto, LoginDto} from "../../types";
import {AuthService} from "../../services/AuthService";
import {UserService} from "../../services/UserService";

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

export const editPersonalData = createAsyncThunk(
    'auth/editPersonalData',
    async (editUserDto: EditUserDto, {dispatch}) => {
        try {
            const {data} = await UserService.edit(editUserDto);
            dispatch(setUser(data.data));
        } catch (e) {
            throw e;
        }
    }
)

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

        setUser(state, {payload}) {
            state.user = payload;
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

export const {authenticate, setUser, exit} = authSlice.actions;

export default authSlice.reducer;