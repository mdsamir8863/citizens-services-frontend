import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { baseApi } from './api/baseApi' // 1. Import our new RTK Query base API

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // 2. Add the RTK Query reducer here
        [baseApi.reducerPath]: baseApi.reducer,
    },
    // 3. KEEP THIS: Your excellent security practice! 
    devTools: import.meta.env.MODE !== 'production',

    // 4. UNCOMMENT & UPDATE THIS: Add the RTK Query middleware for caching and fetching
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

// Types for TypeScript support
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch