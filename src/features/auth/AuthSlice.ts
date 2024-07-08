import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Details {
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    password: string;
}

export interface LoginResponse {
}

export interface RegisterResponse {
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        registerUser: builder.mutation<RegisterResponse, Details>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }), src/ features / auth / AuthSlice.ts
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = apiSlice as {
    useLoginUserMutation: () => ReturnType<typeof apiSlice.endpoints.loginUser.useMutation>;
    useRegisterUserMutation: () => ReturnType<typeof apiSlice.endpoints.registerUser.useMutation>;
};
