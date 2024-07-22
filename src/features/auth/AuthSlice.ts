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
    user_id: number;
    name: string;
    email: string;
}

export interface Tcustomers {
    user_id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
}

export type UsersResponse = Tuser;

export interface LoginResponse {
    user_id: number;
    token: string;
    role: string
}

export interface RegisterResponse { }


export const apiSlice = createApi({
    reducerPath: 'api',
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
        updateUser: builder.mutation({
            query: (user) => ({
                url: `user/update/${user.id}`,
                method: 'PUT',
                body: user,
            }),
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `user/delete/${id}`,
                method: 'DELETE',
            }),
        }),

    }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = apiSlice as unknown as {
    useLoginUserMutation: () => ReturnType<typeof apiSlice.endpoints.loginUser.useMutation>;
    useRegisterUserMutation: () => ReturnType<typeof apiSlice.endpoints.registerUser.useMutation>;
    useGetUserQuery: (id: number, options?: { pollingInterval?: number }) => ReturnType<typeof apiSlice.endpoints.getUser.useQuery>;
    useGetAllUsersQuery: () => ReturnType<typeof apiSlice.endpoints.getAllUsers.useQuery>;
    useUpdateUserMutation: (id: number) => ReturnType<typeof apiSlice.endpoints.updateUser.useMutation>;
    useDeleteUserMutation: (id: number) => ReturnType<typeof apiSlice.endpoints.deleteUser.useMutation>;
};

