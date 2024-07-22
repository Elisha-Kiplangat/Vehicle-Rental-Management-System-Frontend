import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Branches {
    branch_id: number;
    contact_phone: string;
    name: string;
    created_at: string;
    updated_at: string;
    location_id: number;
}

export const branchesApi = createApi({
    reducerPath: 'branchesApi',
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
    tagTypes: ['branches'],
    endpoints: (builder) => ({
        fetchBranches: builder.query<Branches[], void>({
            query: () => '/branches',
            providesTags: ['branches'],
        }),
        addBranches: builder.mutation<Branches, Partial<Branches>>({
            query: (newbranches) => ({
                url: '/branches',
                method: 'POST',
                body: newbranches,
            }),
            invalidatesTags: ['branches'],
        }),
    }),
});

export const { useFetchBranchesQuery, useAddBranchesMutation } = branchesApi as {
    useFetchBranchesQuery: (options?: { pollingInterval?: number; skipPollingIfUnfocused?: boolean; }) => ReturnType<typeof branchesApi.endpoints.fetchBranches.useQuery>
    useAddBranchesMutation: () => ReturnType<typeof branchesApi.endpoints.addBranches.useMutation>
};
