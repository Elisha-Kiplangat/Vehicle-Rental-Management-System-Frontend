import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 

export interface Vehicle {
    vehicle_id: number;
    availability: string;
    rental_rate: number;
    vehicle_specification_id: number;
}

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
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
    tagTypes: ['Vehicle'],
    endpoints: (builder) => ({
        fetchVehicles: builder.query<Vehicle[], void>({
            query: () => '/vehicles',
            providesTags: ['Vehicle'],
        }),
        addVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
            query: (newVehicle) => ({
                url: '/vehicles',
                method: 'POST',
                body: newVehicle,
            }),
            invalidatesTags: ['Vehicle'],
        }),
    }),
});

export const { useFetchVehiclesQuery, useAddVehicleMutation } = vehiclesApi as {
    useFetchVehiclesQuery: () => ReturnType<typeof vehiclesApi.endpoints.fetchVehicles.useQuery>;
    useAddVehicleMutation: () => ReturnType<typeof vehiclesApi.endpoints.addVehicle.useMutation>

};
