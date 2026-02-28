import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'

interface ConfirmOptions {
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [options, setOptions] = useState<ConfirmOptions | null>(null)
    const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>()

    const confirm = useCallback((options: ConfirmOptions) => {
        setOptions(options)

        return new Promise<boolean>((resolve) => {
            setResolvePromise(() => resolve)
        })
    }, [])

    const handleClose = useCallback(() => {
        resolvePromise?.(false)   
        setOptions(null)
    }, [resolvePromise])

    const handleConfirm = useCallback(() => {
        resolvePromise?.(true)
        setOptions(null)
    }, [resolvePromise])

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {options && (
                <ConfirmDialog
                    isOpen={true}
                    title={options.title || 'Confirm Action'}
                    message={options.message}
                    confirmText={options.confirmText}
                    cancelText={options.cancelText}
                    onConfirm={handleConfirm}
                    onClose={handleClose}   
                />
            )}
        </ConfirmContext.Provider>
    )
}

export const useConfirm = () => {
    const context = useContext(ConfirmContext)
    if (!context) {
        throw new Error('useConfirm must be used inside ConfirmProvider')
    }
    return context
}