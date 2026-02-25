import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import LoginPage from '@/features/auth/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
    ],
  },
])