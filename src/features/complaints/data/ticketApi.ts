// Example of how it will look later:
import { baseApi } from '../../../app/api/baseApi'

export const ticketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: () => '/tickets',
            providesTags: ['Tickets'],
        }),
    }),
})

export const { useGetTicketsQuery } = ticketApi