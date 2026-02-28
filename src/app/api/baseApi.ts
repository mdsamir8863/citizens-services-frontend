import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// This is our central API configuration. 
// When the real backend is ready, we just change the baseUrl here.
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api', // Later I will Replace with your actual backend URL later
        // We can dynamically inject our token here later if we move away from HttpOnly cookies
        prepareHeaders: (headers) => {
            // Example: headers.set('authorization', `Bearer ${token}`)
            return headers
        },
    }),
    // These tags help us auto-refresh data. 
    // E.g., If we edit a User, we invalidate 'Users', and the table re-fetches instantly.
    tagTypes: ['Tickets', 'Users', 'Services', 'Profile'],
    endpoints: () => ({}), // Endpoints are injected dynamically in feature folders
})