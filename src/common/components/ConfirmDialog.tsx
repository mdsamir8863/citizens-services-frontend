import React, { useEffect } from 'react'
import { AlertTriangle, Info, X, AlertCircle, Loader2 } from 'lucide-react'

export type DialogType = 'danger' | 'warning' | 'info'

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    type?: DialogType
    isLoading?: boolean // Disable buttons if API call is running
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning',
    isLoading = false
}: ConfirmDialogProps) {

    // Prevent scrolling on background when modal is open
    // Close on Escape key press (Standard Senior Dev Practice for Accessibility)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isLoading) onClose()
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('keydown', handleKeyDown)
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose, isLoading])

    if (!isOpen) return null

    // Determine UI based on the type of action
    const getThemeParams = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: <AlertCircle className="w-6 h-6 text-red-600" />,
                    iconBg: 'bg-red-100',
                    confirmBtnClass: 'btn-danger'
                }
            case 'info':
                return {
                    icon: <Info className="w-6 h-6 text-blue-600" />,
                    iconBg: 'bg-blue-100',
                    confirmBtnClass: 'btn-primary'
                }
            case 'warning':
            default:
                return {
                    icon: <AlertTriangle className="w-6 h-6 text-primary-600" />,
                    iconBg: 'bg-primary-100',
                    confirmBtnClass: 'btn-primary'
                }
        }
    }

    const theme = getThemeParams()

    return (
        // Overlay (Backdrop)
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">

            {/* // Modal Card */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header Container */}
                <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.iconBg}`}>
                            {theme.icon}
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                        {title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 mt-2 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="btn-secondary !py-2 !px-5 disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`${theme.confirmBtnClass} !py-2 !px-5 disabled:opacity-70`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}