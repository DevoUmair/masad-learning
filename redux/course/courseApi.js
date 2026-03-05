import { baseApi } from "../api/api";

export const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (courseData) => ({
                url: '/courses',
                method: 'POST',
                // When using FormData, Redux Toolkit Query will automatically figure out and set the correct Content-Type (multipart/form-data)
                // and boundary if body is an instance of FormData
                body: courseData,
            }),
        }),

        getCourses: builder.query({
            // Accept a params object so you can easily add more filters later
            query: (params = {}) => ({
                url: '/courses',
                method: 'GET',
                params: params,
            }),
        }),
        approveCourse: builder.mutation({
            query: ({ id, price }) => ({
                url: `/courses/${id}/approve`,
                method: 'PUT',
                body: { price },
            }),
        }),
        getInstructorCourses: builder.query({
            query: (id) => ({
                url: `/courses/${id}/instructor`,
                method: 'GET',
            }),
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
        }),
    }),
    overrideExisting: false,
});

export const { useCreateCourseMutation, useGetCoursesQuery, useApproveCourseMutation, useGetInstructorCoursesQuery, useGetCourseByIdQuery, useEditCourseMutation } = courseApi;
