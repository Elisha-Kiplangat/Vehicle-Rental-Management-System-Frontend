import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../features/auth/AuthSlice';
import userReducer from '../features/user/UserSlice';
import { bookingApi } from '../features/BookingAPI';
import { vehiclesApi } from '../features/VehiclesAPI';
import { messagesApi } from '../features/MessagesApi';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [vehiclesApi.reducerPath]: vehiclesApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, bookingApi.middleware, vehiclesApi.middleware, messagesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
