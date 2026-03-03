// src/store/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { setCredentials, logOut } from '../auth/AuthSlice';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    credentials: 'include',
    // We don't need withCredentials here for the baseQuery if we manually attach the token,
    // but if your refresh token relies on cookies, you need it for the specific refresh endpoint.
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                // Attempt to refresh the token
                // NOTE: This endpoint MUST send cookies (withCredentials) if your refresh token is in an HttpOnly cookie
                const refreshResult = await baseQuery(
                    { url: '/users/refresh-token', method: 'POST', credentials: 'include' },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    // Store the new token
                    api.dispatch(setCredentials({
                        accessToken: refreshResult.data.accessToken,
                        user: refreshResult.data.user // Assuming refresh returns user too
                    }));

                    // Retry the initial query with the new token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // Refresh failed, log out
                    api.dispatch(logOut());
                    // In a Next.js app, you might want to redirect here, but doing it in a component or middleware is cleaner
                }
            } finally {
                // Release must be called once the mutex should be released again
                release();
            }
        } else {
            // Wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}), // We'll inject endpoints later
});