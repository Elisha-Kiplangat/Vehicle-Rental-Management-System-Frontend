import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Fleet {
    fleet_id: number;
    vehicle_id: number;
    maintenance_cost: string;
    status: string;
    current_value: string;
    acquisition_date: string;
    depreciation_rate: string;
    created_at: string;
    updated_at: string;
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
                url: '/fleets',
                method: 'POST',
                body: newFleet,
            }),
            invalidatesTags: ['fleet'],
        }),
        updateFleet: builder.mutation<Fleet, Partial<Fleet>>({
            query: (updatedFleet) => ({
                url: `/fleets/${updatedFleet.fleet_id}`,
                method: 'PUT',
                body: updatedFleet,
            }),
            invalidatesTags: ['fleet'],
        }),
        deleteFleet: builder.mutation<void, number>({
            query: (fleetId) => ({
                url: `/fleets/delete/${fleetId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['fleet'],
        }),
    }),
});

export const { useFetchFleetsQuery, useAddFleetMutation, useUpdateFleetMutation, useDeleteFleetMutation } = fleetApi as {
    useFetchFleetsQuery: (options?: { pollingInterval?: number; skipPollingIfUnfocused?: boolean; }) => ReturnType<typeof fleetApi.endpoints.fetchFleets.useQuery>;
    useAddFleetMutation: () => ReturnType<typeof fleetApi.endpoints.addFleet.useMutation>;
    useUpdateFleetMutation: () => ReturnType<typeof fleetApi.endpoints.updateFleet.useMutation>;
    useDeleteFleetMutation: () => ReturnType<typeof fleetApi.endpoints.deleteFleet.useMutation>;

};
