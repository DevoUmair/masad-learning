// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    accessToken: null,
    loading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.loading = false;
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const { setCredentials, logOut, setLoading } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.accessToken;