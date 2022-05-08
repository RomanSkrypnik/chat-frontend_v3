import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserState} from "../../types";
import {UserService} from "../../services/UserService";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (hash: string, {dispatch}) => {
        try {
            const {data} = await UserService.user(hash);
            dispatch(setUser(data.data));
        } catch (e) {
            console.log(e);
        }
    }
);

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, {dispatch}) => {
        try {
            const {data} = await UserService.users();
            dispatch(setUsers(data.data));
        } catch (e) {
            console.log(e);
        }
    }
);

export const fetchUsersBySearch = createAsyncThunk(
    'user/fetchUsersBySearch',
    async (search: string, {dispatch}) => {
        try {
            const {data} = await UserService.usersBySearch(search);
            dispatch(setUsers(data.data));
        } catch (e) {
            console.log(e);
        }
    }
);

const initialState: UserState = {
    users: [],
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUsers(state, {payload}) {
            state.users = payload;
        },

        setUser(state, {payload}) {
            state.user = payload;
        }

    }
})

export const {setUsers, setUser} = userSlice.actions;

export default userSlice.reducer;