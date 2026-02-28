// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { AuthState, User } from './types'

// // Initial state uses our strict AuthState interface
// const initialState: AuthState = {
//     user: null,
//     isAuthenticated: false,
// }

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         // When logging in, we only save the user profile to Redux.
//         // The actual Access Token will be kept in memory/cookies via the API layer.
//         setCredentials: (state, action: PayloadAction<{ user: User }>) => {
//             state.user = action.payload.user
//             state.isAuthenticated = true
//         },
//         logOut: (state) => {
//             state.user = null
//             state.isAuthenticated = false
//         },
//     },
// })

// export const { setCredentials, logOut } = authSlice.actions
// export default authSlice.reducer



import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// PDF Phase 1: Store adminRole and adminId [cite: 17, 48]
interface AuthState {
    user: {
        adminId: string;
        email: string;
        adminRole: string;
    } | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: AuthState['user']; accessToken: string }>
        ) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
        },
        logOut: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
        },
    },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer