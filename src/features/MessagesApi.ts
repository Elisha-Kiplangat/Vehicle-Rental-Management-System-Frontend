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
        baseUrl: 'http://localhost:8000',
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

export const { useFetchMessagesQuery, useAddMessageMutation } = messagesApi as {
    useFetchMessagesQuery: () => ReturnType<typeof messagesApi.endpoints.fetchMessages.useQuery>;
    useAddMessageMutation: () => ReturnType<typeof messagesApi.endpoints.addMessage.useMutation>
};
