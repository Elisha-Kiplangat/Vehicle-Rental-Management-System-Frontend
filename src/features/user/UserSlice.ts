import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../auth/AuthSlice';

export interface UserState {
    id: number | null;
    token: string | null;
}

const initialState: UserState = {
    id: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoginResponse>) => {
            state.id = action.payload.user_id;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.id = null;
            state.token = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
