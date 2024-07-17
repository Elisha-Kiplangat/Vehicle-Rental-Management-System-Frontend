import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Booking {
    booking_id: number;
    vehicle_id: string;
    booking_date: string;
    return_date: string;
    total_amount: number;
    booking_status: string;
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
        fetchBookingById: builder.query<Booking, number>({
            query: (userId) => `/bookings/${userId}`, 
            
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

export const { useFetchBookingsQuery, useFetchBookingByIdQuery, useAddBookingMutation } = bookingApi as unknown as {
    useFetchBookingByIdQuery: (id: number, options?: { pollingInterval?: number }) => ReturnType<typeof bookingApi.endpoints.fetchBookingById.useQuery>;
    useFetchBookingsQuery: () => ReturnType<typeof bookingApi.endpoints.fetchBookings.useQuery>;
    useAddBookingMutation: () => ReturnType<typeof bookingApi.endpoints.addBooking.useMutation>;
}
