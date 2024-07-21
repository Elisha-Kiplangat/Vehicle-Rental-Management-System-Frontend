
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface SummaryResponse {
    totalVehicles: number;
    totalUsers: number;
    totalBookings: number;
    unreadMessages: number;
    totalActiveBookings: number;
}

export const summaryApi = createApi({
    reducerPath: 'summaryApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://vehicle-rental-management-system-api.onrender.com',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query<SummaryResponse, void>({
            query: () => 'vehicle/totals',
        }),
        getUsersTotals: builder.query<SummaryResponse, void>({
            query: () => 'total/users',
        }),
        getbookingTotals: builder.query<SummaryResponse, void>({
            query: () => 'total/bookings',
        }),
        getmessageTotals: builder.query<SummaryResponse, void>({
            query: () => 'total/supportTickets',
        }),
        getActiveBookingTotals: builder.query<SummaryResponse, void>({
            query: () => '/total/active/bookings',
        }),

    }),
        
});

export const { useGetSummaryQuery, useGetUsersTotalsQuery, useGetbookingTotalsQuery, useGetmessageTotalsQuery, useGetActiveBookingTotalsQuery } = summaryApi as {
    useGetSummaryQuery: () => ReturnType<typeof summaryApi.endpoints.getSummary.useQuery>;
    useGetUsersTotalsQuery: () => ReturnType<typeof summaryApi.endpoints.getUsersTotals.useQuery>;
    useGetbookingTotalsQuery: () => ReturnType<typeof summaryApi.endpoints.getbookingTotals.useQuery>;
    useGetmessageTotalsQuery: () => ReturnType<typeof summaryApi.endpoints.getmessageTotals.useQuery>;
    useGetActiveBookingTotalsQuery: () => ReturnType<typeof summaryApi.endpoints.getActiveBookingTotals.useQuery>;
};
