import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Search, User, Settings, LogOut, Sun, Moon, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { logOut } from '../../features/auth/authSlice'
import NotificationBell from './NotificationBell'
import { ROLES } from '../../features/auth/types'
import ConfirmDialog from './ConfirmDialog'
// import ConfirmDialog from '../common/components/ConfirmDialog' 

interface HeaderProps {
    toggleMobileSidebar: () => void
}

const Header = React.memo(({ toggleMobileSidebar }: HeaderProps) => {
    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    // ✅ New State for Confirm Dialog
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    // Check initial theme
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setIsDarkMode(true)
        }
    }, [])

    const toggleTheme = useCallback(() => {
        document.documentElement.classList.toggle('dark')
        setIsDarkMode((prev) => !prev)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // ✅ Open Confirm Dialog Instead of Direct Logout
    const handleLogout = useCallback(() => {
        setIsDropdownOpen(false)
        setIsLogoutDialogOpen(true)
    }, [])

    // ✅ Final Confirm Action
    const confirmLogout = useCallback(() => {
        setIsLogoutDialogOpen(false)
        dispatch(logOut())
        navigate('/login', { replace: true })
    }, [dispatch, navigate])

    return (
        <>
            <header className="h-16 bg-white shadow-sm border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 z-30 sticky top-0 transition-colors duration-300">

                {/* Left Side */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        onClick={toggleMobileSidebar}
                        className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 hover:text-primary-600 rounded-md md:hidden transition-colors cursor-pointer"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="hidden md:flex items-center w-64 lg:w-96 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                        <input
                            type="text"
                            placeholder="Search citizens, complaints..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-800"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">

                    <button
                        onClick={toggleTheme}
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                        title="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    <NotificationBell />

                    <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors">
                                    {user?.adminRole || 'Administrator'}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {user?.email || 'admin@citizen.gov'}
                                </p>
                            </div>

                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold shadow-inner border border-primary-200 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                {user?.adminRole ? user.adminRole.charAt(0) : 'A'}
                            </div>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

                                <div className="p-4 border-b border-slate-50 bg-slate-50/50 md:hidden">
                                    <p className="text-sm font-bold text-slate-800">{user?.adminRole}</p>
                                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                </div>

                                <div className="p-2">
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                                    >
                                        <User className="w-4 h-4" /> My Profile
                                    </Link>

                                    {user?.adminRole === ROLES.SUPER_ADMIN && (
                                        <Link
                                            to="/settings"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                                        >
                                            <Settings className="w-4 h-4" /> System Settings
                                        </Link>
                                    )}
                                </div>

                                <div className="p-2 border-t border-slate-50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" /> Secure Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ✅ Confirm Dialog Added */}
            <ConfirmDialog
                isOpen={isLogoutDialogOpen}
                onClose={() => setIsLogoutDialogOpen(false)}
                onConfirm={confirmLogout}
                title="Confirm Secure Logout"
                message="Are you sure you want to logout? You will need to login again to access the dashboard."
                confirmText="Yes, Logout"
                cancelText="Cancel"
                type="warning"
            />
        </>
    )
})

Header.displayName = 'Header'
export default Header