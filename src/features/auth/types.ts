// 1. Domain Constants (No more hardcoded magic strings!)
export const ROLES = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    SUPPORT_ADMIN: 'Support Admin',
} as const

// 2. Strong Role Typing (TypeScript will now enforce these exact strings)
export type Role = typeof ROLES[keyof typeof ROLES]

// 3. Secure User Interface
export interface User {
    adminId: string
    email: string
    adminRole: Role
}

// 4. Auth State Interface (Notice: NO token stored here. It's strictly for UI state)
export interface AuthState {
    user: User | null
    isAuthenticated: boolean
}