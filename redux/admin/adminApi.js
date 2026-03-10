import { baseApi } from "../api/api";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminStats: builder.query({
            query: () => ({
                url: '/admin/dashboard-stats',
                method: 'GET',
            }),
            providesTags: ['AdminStats'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAdminStatsQuery,
} = adminApi;
