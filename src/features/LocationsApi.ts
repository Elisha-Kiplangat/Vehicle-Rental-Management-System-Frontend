import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Location {
    location_id: number;
    address: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export const locationApi = createApi({
    reducerPath: 'LocationsApi',
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
    tagTypes: ['location'],
    endpoints: (builder) => ({
        fetchLocations: builder.query<Location[], void>({
            query: () => '/locations',
            providesTags: ['location'],
        }),
        addLocation: builder.mutation<Location, Partial<Location>>({
            query: (newLocation) => ({
                url: '/add/locations',
                method: 'POST',
                body: newLocation,
            }),
            invalidatesTags: ['location'],
        }),
    }),
});

export const { useFetchLocationsQuery } = locationApi as {
    useFetchLocationsQuery: (options?: { pollingInterval?: number; skipPollingIfUnfocused?: boolean; }) => ReturnType<typeof locationApi.endpoints.fetchLocations.useQuery>

};
