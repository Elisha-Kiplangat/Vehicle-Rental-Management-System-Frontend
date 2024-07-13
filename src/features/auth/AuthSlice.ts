import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserDetails {
    // id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    password: string;
}

export interface Tuser {
    id: number;
    name: string;
    email: string;
}

export interface Tcustomers {
    id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
}

export type UsersResponse = Tuser;

export interface LoginResponse {
    id: number;
    token: string;
    role: string
}

export interface RegisterResponse { }


export const apiSlice = createApi({
    reducerPath: 'api',
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
    tagTypes: ['Tuser'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: { email, password },
            }),
        }),
        registerUser: builder.mutation<RegisterResponse, UserDetails>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
        }),
        getUser: builder.query<Tuser, number>({
            query: (id) => `users/${id}`,
        }),

        getAllUsers: builder.query<Tcustomers, void>({
            query: () => 'users',
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useGetAllUsersQuery } = apiSlice as unknown as {
    useLoginUserMutation: () => ReturnType<typeof apiSlice.endpoints.loginUser.useMutation>;
    useRegisterUserMutation: () => ReturnType<typeof apiSlice.endpoints.registerUser.useMutation>;
    useGetUserQuery: () => ReturnType<typeof apiSlice.endpoints.getUser.useQuery>;
    useGetAllUsersQuery: () => ReturnType<typeof apiSlice.endpoints.getAllUsers.useQuery>;
};
