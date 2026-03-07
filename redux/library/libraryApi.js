import { baseApi } from '../api/api';

export const libraryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTusSignature: builder.mutation({
            query: (data) => ({
                url: '/library/signature',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Library'],
        }),
        saveLibraryVideo: builder.mutation({
            query: (videoData) => ({
                url: '/library/save',
                method: 'POST',
                body: videoData,
            }),
            invalidatesTags: ['Library'],
        }),
        getLibraryVideos: builder.query({
            query: () => '/library',
            providesTags: ['Library'],
        }),
        deleteLibraryVideo: builder.mutation({
            query: (id) => ({
                url: `/library/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Library'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetTusSignatureMutation,
    useSaveLibraryVideoMutation,
    useGetLibraryVideosQuery,
    useDeleteLibraryVideoMutation,
} = libraryApi;
