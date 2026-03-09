import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/AuthSlice';
import { baseApi } from '../api/api';

const logoutMiddleware = (store) => (next) => (action) => {
    if (action.type === 'auth/logOut') {
        store.dispatch(baseApi.util.resetApiState());
    }
    return next(action);
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware, logoutMiddleware),
});