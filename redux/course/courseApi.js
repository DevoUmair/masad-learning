import { baseApi } from "../api/api";

export const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (courseData) => ({
                url: '/courses',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags: ['Course'],
        }),

        getCourses: builder.query({
            query: (params = {}) => ({
                url: '/courses',
                method: 'GET',
                params: params,
            }),
            providesTags: ['Course'],
        }),
        approveCourse: builder.mutation({
            query: ({ id, price }) => ({
                url: `/courses/${id}/approve`,
                method: 'PUT',
                body: { price },
            }),
            invalidatesTags: ['Course'],
        }),
        getInstructorCourses: builder.query({
            query: (id) => ({
                url: `/courses/${id}/instructor`,
                method: 'GET',
            }),
            providesTags: ['Course'],
        }),
        getCourseById: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'GET',
            }),
        }),
        editCourse: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/courses/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Course'],
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateCourseMutation, useGetCoursesQuery, useApproveCourseMutation, useGetInstructorCoursesQuery, useGetCourseByIdQuery, useEditCourseMutation, useDeleteCourseMutation } = courseApi;
