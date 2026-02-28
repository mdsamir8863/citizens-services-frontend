import React, { useMemo, useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    FileText,
    AlertCircle,
    LogOut,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { logOut } from '../../features/auth/authSlice'
import { ROLES } from '../../features/auth/types'
import { useConfirm } from '../contexts/ConfirmContext'
import { useToast } from '../contexts/useToast'

const NAVIGATION_ITEMS = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, allowedRoles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPPORT_ADMIN] },
    { name: 'User Management', path: '/users', icon: Users, allowedRoles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
    { name: 'Services', path: '/services', icon: FileText, allowedRoles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] },
    { name: 'Ticket & Complains', path: '/complaints', icon: AlertCircle, allowedRoles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPPORT_ADMIN] },
    { name: 'Live Chat', path: '/chat', icon: MessageSquare, allowedRoles: [ROLES.SUPER_ADMIN, ROLES.SUPPORT_ADMIN] },
]

interface SidebarProps {
    isMobileOpen: boolean
    setIsMobileOpen: (open: boolean) => void
    isCollapsed: boolean
    setIsCollapsed: (collapsed: boolean) => void
}

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }: SidebarProps) => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.auth)

    // ✅ Correct destructuring
    const { confirm } = useConfirm()
    const toast = useToast()

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const currentRole = user?.adminRole || ''

    const authorizedNavItems = useMemo(() => {
        return NAVIGATION_ITEMS.filter(item =>
            item.allowedRoles.includes(currentRole as any)
        )
    }, [currentRole])

    const handleLogout = useCallback(async () => {
        if (isLoggingOut) return

        const confirmed = await confirm({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout from your account?',
            confirmText: 'Yes, Logout',
            cancelText: 'Cancel'
        })

        if (!confirmed) return

        try {
            setIsLoggingOut(true)

            dispatch(logOut())

            toast.success('Logged out successfully')
        } catch (error) {
            toast.error('Logout failed. Please try again.')
        } finally {
            setIsLoggingOut(false)
        }
    }, [confirm, dispatch, toast, isLoggingOut])

    return (
        <>
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden animate-in fade-in"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                    } ${isCollapsed ? 'w-20' : 'w-64'}`}
            >
                <div
                    className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'
                        } border-b border-slate-100`}
                >
                    {!isCollapsed && (
                        <h1 className="text-lg font-bold text-slate-800 tracking-wider whitespace-nowrap overflow-hidden">
                            <span className="text-primary-500">CITIZEN</span> ADMIN
                        </h1>
                    )}

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors cursor-pointer"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <ChevronLeft className="w-5 h-5" />
                        )}
                    </button>

                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-md"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
                    <ul className="space-y-2 text-sm font-medium">
                        {authorizedNavItems.map((item) => {
                            const Icon = item.icon
                            const isActive =
                                location.pathname === item.path ||
                                (item.path !== '/' &&
                                    location.pathname.startsWith(item.path))

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMobileOpen(false)}
                                        title={isCollapsed ? item.name : ''}
                                        className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'
                                            } p-3 rounded-md transition-colors ${isActive
                                                ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-500'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary-500'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        {!isCollapsed && (
                                            <span className="whitespace-nowrap">
                                                {item.name}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        title={isCollapsed ? 'Secure Logout' : ''}
                        className={`flex w-full items-center ${isCollapsed ? 'justify-center' : 'gap-3'
                            } p-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors font-medium text-sm cursor-pointer ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                            <span className="whitespace-nowrap">
                                {isLoggingOut ? 'Logging out...' : 'Secure Logout'}
                            </span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    )
}

export default React.memo(Sidebar)