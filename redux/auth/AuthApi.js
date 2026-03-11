import { baseApi } from '../api/api';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/users/refresh-token',
                method: 'POST',
                credentials: 'include',
            }),
            transformResponse: (response) => {
                return {
                    user: response.user,
                    accessToken: response.accessToken,
                };
            },
        }),
        getMe: builder.query({
            query: () => '/users/me',
        }),
        getAllUsers: builder.query({
            query: (role) => `/users?role=${role}`,
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetMeQuery,
    useGetAllUsersQuery,
} = authApi;
