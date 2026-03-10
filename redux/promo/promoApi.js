import { baseApi } from "../api/api";

export const promoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPromos: builder.query({
            query: () => ({
                url: '/promo',
                method: 'GET',
            }),
            providesTags: ['Promo'],
        }),
        createPromo: builder.mutation({
            query: (promoData) => ({
                url: '/promo',
                method: 'POST',
                body: promoData,
            }),
            invalidatesTags: ['Promo'],
        }),
        togglePromoStatus: builder.mutation({
            query: (id) => ({
                url: `/promo/toggle/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Promo'],
        }),
        deletePromo: builder.mutation({
            query: (id) => ({
                url: `/promo/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Promo'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPromosQuery,
    useCreatePromoMutation,
    useTogglePromoStatusMutation,
    useDeletePromoMutation,
} = promoApi;
