import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (payload) => ({
        url: '/create-checkout-session',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = paymentsApi as {
    useCreateCheckoutSessionMutation: () => ReturnType<typeof paymentsApi.endpoints.createCheckoutSession.useMutation>;
};
