import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Message {
    user_id: number;
    subject: string;
    description: string;
    status: string;
    // timestamp: string;
}

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
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
    tagTypes: ['Message'],
    endpoints: (builder) => ({
        fetchMessages: builder.query<Message[], void>({
            query: () => '/supportTickets',
            providesTags: ['Message'],
        }),
        fetchMessagesUser: builder.query<Message, number>({
            query: (user_id) => `/supportTickets/${user_id}`

        }),
        addMessage: builder.mutation<Message, Partial<Message>>({
            query: (newMessage) => ({
                url: '/supportTickets',
                method: 'POST',
                body: newMessage,
            }),
            invalidatesTags: ['Message'],
        }),
    }),
});

export const { useFetchMessagesQuery, useAddMessageMutation, useFetchMessagesUserQuery } = messagesApi as {
    useFetchMessagesQuery: () => ReturnType<typeof messagesApi.endpoints.fetchMessages.useQuery>;
    useAddMessageMutation: () => ReturnType<typeof messagesApi.endpoints.addMessage.useMutation>
    useFetchMessagesUserQuery: (user_id: number, options?: { pollingInterval?: number }) => ReturnType<typeof messagesApi.endpoints.fetchMessagesUser.useQuery>
};
