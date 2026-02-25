import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'

// Mock Login View (Hum isko baad mein features/auth/pages mein move karenge)
const LoginView = () => (
    <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Login</h1>
            <p className="text-slate-500 text-sm mb-6">Enter your registered email to receive an OTP.</p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="admin@example.com"
                    />
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-colors">
                    Send OTP
                </button>
            </div>
        </div>
    </div>
)

// Mock Dashboard Page
const DashboardPage = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-slate-500 text-sm font-medium">Total Citizens</h3>
                <p className="text-3xl font-bold text-slate-800 mt-2">12,450</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-slate-500 text-sm font-medium">Active Services</h3>
                <p className="text-3xl font-bold text-slate-800 mt-2">48</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-slate-500 text-sm font-medium">Pending Complaints</h3>
                <p className="text-3xl font-bold text-slate-800 mt-2">156</p>
            </div>
        </div>
    </div>
)

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginView />,
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
        ],
    },
])