
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CountResponse {
    count: number;
}

export interface SummaryResponse {
    totalVehicles: number;
    totalUsers: number;
    totalBookings: number;
    unreadMessages: number;
    activeRentals: CountResponse[];
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
    }),
});

export const { useGetSummaryQuery } = summaryApi as {
    useGetSummaryQuery: () => ReturnType<typeof summaryApi.endpoints.getSummary.useQuery>;
};
