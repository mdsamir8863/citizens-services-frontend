import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { Role } from '../../features/auth/types' // Import the strict Role type

interface RequireRoleProps {
    allowedRoles: Role[] // Enforce strict typing here
}

export default function RequireRole({ allowedRoles }: RequireRoleProps) {
    const { user } = useAppSelector((state) => state.auth)

    // If the user's role is not in the allowed list, kick them back to the dashboard
    if (!user || !allowedRoles.includes(user.adminRole)) {
        return <Navigate to="/" replace />
    }

    // If they are authorized, render the nested child routes
    return <Outlet />
}