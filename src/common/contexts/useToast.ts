import { useContext } from 'react'
import { ToastContext } from './ToastContext'

export const useToast = () => {
    const context = useContext(ToastContext)

    // Safety check: Prevents developers from using toast outside the Provider
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }

    return context
}