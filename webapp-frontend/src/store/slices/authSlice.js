import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        token: ''
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        clearAuth: (state, action) => {
            state.isAuthenticated = false;
            state.token = '';
        }
    }
});

export default authSlice.reducer;
export const { setAuth, clearAuth } = authSlice.actions;