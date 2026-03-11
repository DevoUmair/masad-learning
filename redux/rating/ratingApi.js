import { baseApi } from "../api/api";

export const ratingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addOrUpdateRating: builder.mutation({
            query: ({ courseId, rating, comment }) => ({
                url: `/ratings/${courseId}`,
                method: 'POST',
                body: { rating, comment },
            }),
            invalidatesTags: (result, error, { courseId }) => [
                { type: 'CourseRatings', id: courseId },
                { type: 'Course', id: courseId }, // Invalidate course so we get fresh average rating
            ],
        }),
        getCourseRatings: builder.query({
            query: ({ courseId, page = 1, limit = 10 }) => ({
                url: `/ratings/${courseId}?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: (result, error, { courseId }) => [{ type: 'CourseRatings', id: courseId }],
        }),
        getUserCourseRating: builder.query({
            query: (courseId) => ({
                url: `/ratings/user/${courseId}`,
                method: 'GET',
            }),
            providesTags: (result, error, courseId) => [{ type: 'UserRating', id: courseId }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddOrUpdateRatingMutation,
    useGetCourseRatingsQuery,
    useGetUserCourseRatingQuery
} = ratingApi;
