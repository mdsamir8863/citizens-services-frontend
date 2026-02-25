import { Outlet } from 'react-router-dom'
import { LayoutDashboard, Users, FileText } from 'lucide-react'

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar - Now Clean White with Saffron Accents */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20">
                <div className="h-16 flex items-center justify-center border-b border-slate-100">
                    <h1 className="text-lg font-bold text-slate-800 tracking-wider">
                        <span className="text-primary-500">CITIZEN</span> ADMIN
                    </h1>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2 text-sm font-medium">
                        {/* Active Link Example */}
                        <li className="flex items-center gap-3 p-3 bg-primary-50 text-primary-600 rounded-md cursor-pointer border-r-4 border-primary-500 transition-colors">
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                        </li>
                        {/* Inactive Links */}
                        <li className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 hover:text-primary-500 rounded-md cursor-pointer transition-colors">
                            <Users className="w-5 h-5" />
                            User Management
                        </li>
                        <li className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 hover:text-primary-500 rounded-md cursor-pointer transition-colors">
                            <FileText className="w-5 h-5" />
                            Services
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <header className="h-16 bg-white shadow-sm border-b border-slate-100 flex items-center justify-end px-8 z-10">
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-800">Super Admin</p>
                            <p className="text-xs text-slate-500">admin@citizen.gov</p>
                        </div>
                        <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                            SA
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content [cite: 118-121] */}
                <main className="flex-1 p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}