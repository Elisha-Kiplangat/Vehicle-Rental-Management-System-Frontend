import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../features/auth/AuthSlice';
import userReducer from '../features/user/UserSlice';
import { bookingApi } from '../features/BookingAPI';
import { vehiclesApi } from '../features/VehiclesAPI';
import { messagesApi } from '../features/MessagesApi';
import { paymentsApi } from '../features/PaymentApi';
import { fleetApi } from '../features/FleetApi';
import { locationApi } from '../features/LocationsApi';
import { branchesApi } from '../features/BranchesApi';
import { summaryApi } from '../features/summaryApi'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [vehiclesApi.reducerPath]: vehiclesApi.reducer,
        [messagesApi.reducerPath]: messagesApi.reducer,
        [paymentsApi.reducerPath]: paymentsApi.reducer, 
        [fleetApi.reducerPath]: fleetApi.reducer, 
        [locationApi.reducerPath]: locationApi.reducer,
        [branchesApi.reducerPath]: branchesApi.reducer,
        [summaryApi.reducerPath]: summaryApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, bookingApi.middleware, vehiclesApi.middleware, messagesApi.middleware, paymentsApi.middleware,
            fleetApi.middleware, locationApi.middleware, branchesApi.middleware, summaryApi.middleware
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
