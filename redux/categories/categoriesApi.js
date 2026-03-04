import { baseApi } from "../api/api";

export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (categoryData) => ({
                url: '/categories',
                method: 'POST',
                // When using FormData, Redux Toolkit Query will automatically figure out and set the correct Content-Type (multipart/form-data)
                // and boundary if body is an instance of FormData
                body: categoryData,
            }),
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/categories',
                method: 'GET',
            }),
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesApi;
