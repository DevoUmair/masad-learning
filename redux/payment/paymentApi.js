import { baseApi } from '../api/api';

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url: '/payments/create-checkout-session',
                method: 'POST',
                body: { courseId },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateCheckoutSessionMutation } = paymentApi;
