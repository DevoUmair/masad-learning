import { baseApi } from "../api/api";

export const instructorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEnrolledStudents: builder.query({
            query: () => ({
                url: '/instructor/enrolled-students',
                method: 'GET',
            }),
            providesTags: ['EnrolledStudents'],
        }),
        getInstructorProfile: builder.query({
            query: (id) => ({
                url: `/instructor/admin/instructor-profile/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'AdminInstructorProfile', id }],
        }),
        getStudentProfile: builder.query({
            query: (studentId) => ({
                url: `/instructor/student-profile/${studentId}`,
                method: 'GET',
            }),
            providesTags: (result, error, studentId) => [{ type: 'StudentProfile', id: studentId }],
        }),
        getInstructorStats: builder.query({
            query: () => ({
                url: '/instructor/dashboard-stats',
                method: 'GET',
            }),
            providesTags: ['InstructorStats'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllEnrolledStudentsQuery,
    useGetStudentProfileQuery,
    useGetInstructorStatsQuery,
    useGetInstructorProfileQuery
} = instructorApi;
