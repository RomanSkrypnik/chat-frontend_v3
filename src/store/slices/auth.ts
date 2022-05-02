import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthState, LoginDto} from "../../types/auth";
import {AuthService} from "../../services/AuthService";

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginDto, {dispatch}) => {
        try {
            const {data} = await AuthService.login(loginData);
            const {accessToken} = data.data.tokens;

            localStorage.setItem('accessToken', accessToken);

            dispatch(authenticate(data.data.user))
        } catch (e) {
            console.log(e);
        }
    }
)

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
        }

    }
})

export const {authenticate} = authSlice.actions;

export default authSlice.reducer;