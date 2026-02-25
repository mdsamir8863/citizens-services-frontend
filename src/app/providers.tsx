import React from 'react'

// Jab tak Redux store nahi banta, hum ek khali wrapper return kar rahe hain
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}