import React, { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../common/components/Sidebar'
import Header from '../common/components/Header'

export default function AdminLayout() {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    // STABLE FUNCTION: Prevents Header from thinking the props changed
    const toggleMobileSidebar = useCallback(() => {
        setIsMobileOpen(true)
    }, [])

    return (
        <div className="flex h-screen bg-slate-50  overflow-hidden transition-colors duration-300">
            <Sidebar
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <div className="flex-1 flex flex-col relative min-w-0">
                <Header toggleMobileSidebar={toggleMobileSidebar} />

                <main className="flex-1 overflow-auto bg-slate-50  transition-colors duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}