import { baseApi } from "../api/api";

export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        enrollCourse: builder.mutation({
            query: (courseId) => ({
                url: `/students/enroll-course/${courseId}`,
                method: 'POST',
            }),
        }),
        getEnrolledCourses: builder.query({
            query: () => ({
                url: '/students/enrolled-courses',
                method: 'GET',
            }),
            providesTags: ['EnrolledCourses'], // Helpful if we need to invalidate
        }),
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `/students/course-progress/${courseId}`,
                method: 'GET',
            }),
            providesTags: (result, error, courseId) => [{ type: 'CourseProgress', id: courseId }],
        }),
        updateProgress: builder.mutation({
            query: ({ courseId, lessonId }) => ({
                url: `/students/update-progress/${courseId}`,
                method: 'POST',
                body: { lessonId },
            }),
            invalidatesTags: (result, error, { courseId }) => [
                { type: 'CourseProgress', id: courseId },
                'EnrolledCourses'
            ],
        }),
    }),
    overrideExisting: false,
});

export const {
    useEnrollCourseMutation,
    useGetEnrolledCoursesQuery,
    useGetCourseProgressQuery,
    useUpdateProgressMutation
} = studentApi;
