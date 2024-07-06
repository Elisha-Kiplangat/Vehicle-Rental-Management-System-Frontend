
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../features/auth/AuthSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
