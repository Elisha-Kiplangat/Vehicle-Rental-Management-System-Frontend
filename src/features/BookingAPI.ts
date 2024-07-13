import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Booking {
    booking_id: number;
    vehicle_name: string;
    booking_date: string;
    return_date: string;
    amount: number;
    status: string;
}

export const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Booking'],
    endpoints: (builder) => ({
        fetchBookings: builder.query<Booking[], void>({
            query: () => '/bookings',
            providesTags: ['Booking'],
        }),
        addBooking: builder.mutation<Booking, Partial<Booking>>({
            query: (newBooking) => ({
                url: '/bookings',
                method: 'POST',
                body: newBooking,
            }),
            invalidatesTags: ['Booking'],
        }),
    }),
});

export const { useFetchBookingsQuery, useAddBookingMutation } = bookingApi as {
    useFetchBookingsQuery: () => ReturnType<typeof bookingApi.endpoints.fetchBookings.useQuery>;
    useAddBookingMutation: () => ReturnType<typeof bookingApi.endpoints.addBooking.useMutation>
};
