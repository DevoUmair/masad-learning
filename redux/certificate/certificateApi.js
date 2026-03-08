import { baseApi } from "../api/api";

export const certificateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCertificates: builder.query({
            query: () => ({
                url: '/certificates',
                method: 'GET',
            }),
            providesTags: ['Certificate'],
        }),

        getCertificateById: builder.query({
            query: (id) => ({
                url: `/certificates/${id}`,
                method: 'GET',
            }),
            providesTags: ['Certificate'],
        }),

    }),
    overrideExisting: false,
});

export const {
    useGetCertificatesQuery,
    useGetCertificateByIdQuery
} = certificateApi;
