import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
};

const authContext = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.isAuthenticated = true;
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authContext.actions;
export default authContext.reducer;
