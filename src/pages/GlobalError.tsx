import { useRouteError, Link } from 'react-router-dom'
import { AlertTriangle, Home } from 'lucide-react'

export default function GlobalError() {
    // React Router automatically catches the error and passes it here
    const error = useRouteError() as any

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center transition-colors duration-300">
            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full border border-slate-200 ">

                <div className="w-16 h-16 bg-red-100  text-red-600  rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-bold text-slate-800  mb-2">
                    System Error
                </h1>

                <p className="text-slate-500  mb-6 text-sm">
                    {error?.statusText || error?.message || "An unexpected rendering error occurred in the application."}
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white w-full px-6 py-3 rounded-lg font-bold transition-colors shadow-sm"
                >
                    <Home className="w-4 h-4" /> Return to Dashboard
                </Link>

            </div>
            <p className="mt-8 text-xs text-slate-400">
                If this issue persists, please contact IT Support.
            </p>
        </div>
    )
}