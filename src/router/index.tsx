import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from '../core/guards/ProtectedRoute'
import RequireRole from '@/core/guards/RequireRole'


// Dynamic Code Splitting for performance
const AdminProfile = lazy(() => import('@/features/profile/pages/AdminProfile'))
const SystemSettings = lazy(() => import('@/features/settings/pages/SystemSettings'))
const LoginView = lazy(() => import('../features/auth/pages/LoginView'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const UserList = lazy(() => import('../features/users/pages/UserList'))
const ServiceList = lazy(() => import('@/features/services/pages/ServiceList'))
const ComplaintsSupport = lazy(() => import('@/features/complaints/pages/ComplaintsSupport'))
const LiveChat = lazy(() => import('@/features/chat/pages/LiveChat'))
const ComplaintsList = lazy(() => import('@/features/complaints/pages/ComplaintsList'))
const TicketDetail = lazy(() => import('@/features/complaints/pages/TicketDetail'))

// Suspense Fallback Loader
const PageLoader = () => (
    <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
    </div>
)

export const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <Suspense fallback={<PageLoader />}>
                <LoginView />
            </Suspense>
        ),
    },
    {
        // Protected Admin Routes
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <AdminLayout />,
                children: [
                    {
                        index: true, // This maps to the root dashboard ('/')
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <DashboardPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'users', // 2. Added the User Management route here
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <UserList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'services',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <ServiceList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'complaints',
                        children: [
                            {
                                index: true, // Jab admin sirf /complaints par aayega to List khulegi
                                element: (
                                    <Suspense fallback={<PageLoader />}>
                                        <ComplaintsList />
                                    </Suspense>
                                ),
                            },
                            {
                                path: ':ticketId', // Jab admin /complaints/CMP-1029 par jayega to Detail View khulega
                                element: (
                                    <Suspense fallback={<PageLoader />}>
                                        <TicketDetail />
                                    </Suspense>
                                ),
                            }
                        ]
                    },
                    {
                        path: 'chat',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <LiveChat />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'profile',
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <AdminProfile />
                            </Suspense>
                        ),
                    },
                    {
                        element: <RequireRole allowedRoles={['Super Admin']} />, // Only Super Admins can pass this guard
                        children: [
                            {
                                path: 'settings',
                                element: (
                                    <Suspense fallback={<PageLoader />}>
                                        <SystemSettings />
                                    </Suspense>
                                ),
                            }
                        ]
                    }
                ],
            },
        ],
    },
    {
        // Catch-All Route: Must be placed at the very end of the array
        path: '*',
        element: (
            <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
            </Suspense>
        ),
    }
])