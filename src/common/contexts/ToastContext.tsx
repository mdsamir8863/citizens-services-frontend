import React, { createContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from 'lucide-react'

// 1. Strict Types for our Toast
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
    id: string
    type: ToastType
    message: string
    isRemoving?: boolean
}

interface ToastContextType {
    addToast: (type: ToastType, message: string) => void
    success: (message: string) => void
    error: (message: string) => void
    warning: (message: string) => void
    info: (message: string) => void
}

// 2. Create the Context
export const ToastContext = createContext<ToastContextType | undefined>(undefined)

// 3. The Provider Component
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([])

    // Remove toast with animation
    const removeToast = useCallback((id: string) => {
        setToasts((prev) =>
            prev.map((toast) =>
                toast.id === id ? { ...toast, isRemoving: true } : toast
            )
        )

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, 250)
    }, [])

    // Function to add a toast and auto-remove it after 3 seconds
    const addToast = useCallback((type: ToastType, message: string) => {
        const id = Math.random().toString(36).substring(2, 9)

        setToasts((prev) => [...prev, { id, type, message }])

        setTimeout(() => {
            removeToast(id)
        }, 3000)
    }, [removeToast])

    // Convenience Methods
    const success = useCallback((msg: string) => addToast('success', msg), [addToast])
    const error = useCallback((msg: string) => addToast('error', msg), [addToast])
    const warning = useCallback((msg: string) => addToast('warning', msg), [addToast])
    const info = useCallback((msg: string) => addToast('info', msg), [addToast])

    // Helper to get styling and icons based on type
    const getToastUI = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircle className="w-5 h-5" />,
                    styles: 'bg-green-50 text-green-700 border-green-200'
                }
            case 'error':
                return {
                    icon: <AlertCircle className="w-5 h-5" />,
                    styles: 'bg-red-50 text-red-700 border-red-200'
                }
            case 'warning':
                return {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    styles: 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }
            case 'info':
            default:
                return {
                    icon: <Info className="w-5 h-5" />,
                    styles: 'bg-blue-50 text-blue-700 border-blue-200'
                }
        }
    }

    return (
        <ToastContext.Provider value={{ addToast, success, error, warning, info }}>
            {children}

            {/* Centered Toast Container */}
            <div className="fixed inset-0 flex items-start top-4 justify-center z-[9999] pointer-events-none">
                <div className="flex flex-col gap-4 items-center">
                    {toasts.map((toast) => {
                        const { icon, styles } = getToastUI(toast.type)

                        return (
                            <div
                                key={toast.id}
                                className={`
                                    flex items-center gap-3
                                    px-6 py-4
                                    rounded-2xl
                                    border
                                    shadow-2xl
                                    backdrop-blur-md
                                    min-w-[320px]
                                    pointer-events-auto
                                    font-semibold text-sm
                                    transition-all
                                    ${styles}
                                    ${toast.isRemoving
                                        ? 'animate-toast-out'
                                        : 'animate-toast-in'}
                                `}
                            >
                                <div className="flex-shrink-0">{icon}</div>

                                <div className="flex-1">
                                    {toast.message}
                                </div>

                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="opacity-60 hover:opacity-100 transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ToastContext.Provider>
    )
}