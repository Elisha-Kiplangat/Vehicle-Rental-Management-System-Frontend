import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 

export interface Vehicle {
    vehicle_id: number;
    availability: string;
    rental_rate: number;
    vehicle_specification_id: number;
}

export interface VehicleSpec {
    vehicle_type: string;
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    engine_capacity: string;
    transmission: string;
    seating_capacity: number;
    color: string;
    features: string;
    rental_rate: number;
    availability: boolean;
}

export interface TVehicleDetails {
    vehicle_id: number;
    vehicle_specification_id: number;
    rental_rate: number;
    availability: boolean;
    vehicle_spec: VehicleSpec;
}

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://vehicle-rental-management-system-api.onrender.com/',
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
        fetchVehicleDetails: builder.query<TVehicleDetails[], void>({
            query: () => '/vehicleDetails',
            providesTags: ['Vehicle'],
        }),
        addVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
            query: (newVehicle) => ({
                url: '/add/vehicles',
                method: 'POST',
                body: newVehicle,
            }),
            invalidatesTags: ['Vehicle'],
        }),
        updateVehicle: builder.mutation<Vehicle, { vehicle_id: number; vehicle: Partial<Vehicle> }>({
            query: ({ vehicle_id, vehicle }) => ({
                url: `/vehicles/details/${vehicle_id}`,
                method: 'PUT',
                body: vehicle,
            }),
        }),
        deleteVehicle: builder.mutation<void, number>({
            query: (id) => ({
                url: `vehicles/delete/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
}); 

export const { useFetchVehiclesQuery, useFetchVehicleDetailsQuery, useAddVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation } = vehiclesApi as {
    useFetchVehiclesQuery: () => ReturnType<typeof vehiclesApi.endpoints.fetchVehicles.useQuery>;
    useAddVehicleMutation: () => ReturnType<typeof vehiclesApi.endpoints.addVehicle.useMutation>
    useFetchVehicleDetailsQuery: (options?: {pollingInterval?: number; skipPollingIfUnfocused?: boolean;}) => ReturnType<typeof vehiclesApi.endpoints.fetchVehicleDetails.useQuery>
    useUpdateVehicleMutation: () => ReturnType<typeof vehiclesApi.endpoints.updateVehicle.useMutation>
    useDeleteVehicleMutation: () => ReturnType<typeof vehiclesApi.endpoints.deleteVehicle.useMutation>

};
