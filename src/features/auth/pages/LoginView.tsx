import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Mail, KeyRound, ArrowRight } from 'lucide-react'

export default function LoginView() {
    const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [timeLeft, setTimeLeft] = useState(0)
    const navigate = useNavigate()

    // Countdown Timer Logic [cite: 232-234]
    useEffect(() => {
        if (timeLeft <= 0) return
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setStep('OTP')
        setTimeLeft(60)
    }

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault()
        if (otp.length === 4) {
            navigate('/')
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full admin-card p-0 overflow-hidden border-t-4 border-t-primary-500">
                {/* Header Section - Now White & Saffron */}
                <div className="bg-white p-6 text-center border-b border-slate-100">
                    <div className="mx-auto w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-3">
                        <ShieldCheck className="text-primary-500 w-7 h-7" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Citizen Portal</h2>
                    <p className="text-slate-500 text-sm mt-1">Admin Authentication System</p>
                </div>

                {/* Form Section */}
                <div className="p-8 bg-white">
                    {step === 'EMAIL' ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label className="input-label">Admin Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field pl-10"
                                        placeholder="admin@citizen.gov"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                Generate OTP <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div>
                                <label className="input-label">Enter Secure OTP</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <KeyRound className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        maxLength={4}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))}
                                        className="input-field pl-10 tracking-[1em] font-bold text-lg text-center"
                                        placeholder="••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full !bg-slate-800 hover:!bg-slate-900">
                                Verify & Login
                            </button>

                            <div className="text-center mt-4 text-sm">
                                {timeLeft > 0 ? (
                                    <p className="text-slate-500 font-medium">
                                        Resend code in <span className="text-primary-600 font-bold">00:{timeLeft.toString().padStart(2, '0')}</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setTimeLeft(60)}
                                        className="text-primary-600 font-bold hover:underline cursor-pointer"
                                    >
                                        Resend OTP Now
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}