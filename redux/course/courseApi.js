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
            query: () => ({
                url: '/courses',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateCourseMutation, useGetCoursesQuery } = courseApi;
