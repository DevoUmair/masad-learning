import { baseApi } from '../api/api';

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: () => ({
                url: '/transactions',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetTransactionsQuery } = transactionApi;
