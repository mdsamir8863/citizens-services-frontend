import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, AlertCircle, LogOut, MessageSquare } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { logOut } from '../../features/auth/authSlice'

// 1. RBAC Config-Driven Navigation
// We define which roles are allowed to see which menu items
const NAVIGATION_ITEMS = [
    {
        name: 'Dashboard',
        path: '/',
        icon: LayoutDashboard,
        allowedRoles: ['Super Admin', 'Admin', 'Support Admin']
    },
    {
        name: 'User Management',
        path: '/users',
        icon: Users,
        allowedRoles: ['Super Admin', 'Admin'] // Support Admin cannot see this
    },
    {
        name: 'Services',
        path: '/services',
        icon: FileText,
        allowedRoles: ['Super Admin', 'Admin']
    },
    {
        name: 'Ticket Inbox',
        path: '/complaints',
        icon: AlertCircle,
        allowedRoles: ['Super Admin', 'Admin', 'Support Admin']
    },
    {
        name: 'Live Chat',
        path: '/chat',
        icon: MessageSquare,
        allowedRoles: ['Super Admin', 'Support Admin'] // Support feature
    },
]

export default function Sidebar() {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)

    // 2. Filter menu items based on the logged-in user's role
    const currentRole = user?.adminRole || ''
    const authorizedNavItems = NAVIGATION_ITEMS.filter(item =>
        item.allowedRoles.includes(currentRole)
    )

    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20 shadow-sm">
            <div className="h-16 flex items-center justify-center border-b border-slate-100">
                <h1 className="text-lg font-bold text-slate-800 tracking-wider">
                    <span className="text-primary-500">CITIZEN</span> ADMIN
                </h1>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2 text-sm font-medium">
                    {/* 3. Render only the authorized items */}
                    {authorizedNavItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/' && location.pathname.startsWith(item.path))

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 p-3 rounded-md transition-colors ${isActive
                                        ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-500'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-primary-500'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 p-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors font-medium text-sm cursor-pointer"
                >
                    <LogOut className="w-5 h-5" />
                    Secure Logout
                </button>
            </div>
        </aside>
    )
}