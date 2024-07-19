import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Fleet  {
    Fleet_id: number;
    status: string;
    depreciation_rate: number;
    current_value: number;
    maintenance_cost: number;
    created_at: string ;
    updated_at: string ;
    fleet_id: number;
    acquisition_date: string;
}

export const fleetApi = createApi({
    reducerPath: 'FleetsApi',
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
    tagTypes: ['fleet'],
    endpoints: (builder) => ({
        fetchFleets: builder.query<Fleet[], void>({
            query: () => '/fleets',
            providesTags: ['fleet'],
        }),
        addFleet: builder.mutation<Fleet, Partial<Fleet>>({
            query: (newFleet) => ({
                url: '/add/fleets',
                method: 'POST',
                body: newFleet,
            }),
            invalidatesTags: ['fleet'],
        }),
    }),
});

export const { useFetchFleetsQuery } = fleetApi as {
    useFetchFleetsQuery: (options?: { pollingInterval?: number; skipPollingIfUnfocused?: boolean; }) => ReturnType<typeof fleetApi.endpoints.fetchFleets.useQuery>

};
