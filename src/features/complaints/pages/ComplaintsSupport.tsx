import { useState } from 'react'
import { Send, User, Clock, FileText, AlertTriangle, CheckCircle, Phone, Mail, Sparkles, Lock, MessageSquare, History } from 'lucide-react'

// 1. Strict TypeScript Interfaces
interface ContextUser {
    userId: string
    name: string
    email: string
    phone: string
    accountAge: string
}

interface ContextService {
    serviceId: string
    serviceName: string
    status: string
}

// Changed from "Message" to "TicketEvent" to represent a true ticketing system
interface TicketEvent {
    id: string
    type: 'CITIZEN_REPLY' | 'ADMIN_REPLY' | 'INTERNAL_NOTE' | 'SYSTEM_LOG'
    author: string
    text: string
    timestamp: string
}

interface ComplaintTicket {
    id: string
    title: string
    status: 'OPEN' | 'RESOLVED' | 'ESCALATED'
    events: TicketEvent[]
    context: {
        user: ContextUser
        relatedService: ContextService
    }
}

// 2. Mock Data: True Ticketing Timeline
const MOCK_TICKET: ComplaintTicket = {
    id: 'CMP-1029',
    title: 'Delay in Passport Renewal Verification',
    status: 'OPEN',
    events: [
        { id: 'e1', type: 'SYSTEM_LOG', author: 'System', text: 'Ticket automatically created from Citizen Portal.', timestamp: 'Oct 12, 2025 - 10:30 AM' },
        { id: 'e2', type: 'CITIZEN_REPLY', author: 'Rahul Kumar', text: 'Hello, I applied for my passport renewal 3 weeks ago but the status is still stuck on pending. I have a flight next month. Please help.', timestamp: 'Oct 12, 2025 - 10:32 AM' },
        { id: 'e3', type: 'INTERNAL_NOTE', author: 'Support Admin (You)', text: 'Checked the database. The file is stuck at the local police station for address verification.', timestamp: 'Oct 12, 2025 - 11:05 AM' },
        { id: 'e4', type: 'ADMIN_REPLY', author: 'Support Admin (You)', text: 'Dear Rahul, we have checked your application. It is currently pending with your local police station for physical address verification. We have sent them a reminder.', timestamp: 'Oct 12, 2025 - 11:10 AM' }
    ],
    context: {
        user: { userId: 'USR-445', name: 'Rahul Kumar', email: 'rahul.k@example.com', phone: '+91-9876543210', accountAge: '2 years, 4 months' },
        relatedService: { serviceId: 'SRV-99', serviceName: 'Passport Renewal (Tatkal)', status: 'Pending Police Verification' }
    }
}

export default function ComplaintsSupport() {
    const [replyText, setReplyText] = useState('')
    const [replyType, setReplyType] = useState<'PUBLIC' | 'INTERNAL'>('PUBLIC')
    const [ticket] = useState<ComplaintTicket>(MOCK_TICKET)

    // AI Summary State
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
    const [aiSummary, setAiSummary] = useState<string | null>(null)

    const handleSendAction = (e: React.FormEvent) => {
        e.preventDefault()
        if (!replyText.trim()) return
        alert(`${replyType === 'INTERNAL' ? 'Internal Note' : 'Public Reply'} saved: ${replyText}`)
        setReplyText('')
    }

    // AI Summarize Function Simulator
    const handleSummarizeTicket = () => {
        setIsGeneratingSummary(true)
        setAiSummary(null)
        // Simulate API delay for Gemini/AI
        setTimeout(() => {
            setAiSummary("Citizen Rahul Kumar's passport renewal is delayed due to pending police verification. He has an urgent flight next month. Admin has contacted the local station for an update.")
            setIsGeneratingSummary(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-slate-50  transition-colors duration-300">

            {/* LEFT PANE (60%): Ticket History & Actions */}
            <div className="flex-1 flex flex-col border-r border-slate-200  bg-white transition-colors duration-300">

                {/* Ticket Header */}
                <div className="p-4 border-b border-slate-100  flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800  flex items-center gap-2">
                            {ticket.title}
                            <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700  rounded-md border border-yellow-200">
                                {ticket.status}
                            </span>
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">Ticket ID: {ticket.id} • Created Oct 12, 2025</p>
                    </div>
                    <div className="flex gap-2">
                        {/* AI Summarize Button */}
                        <button
                            onClick={handleSummarizeTicket}
                            disabled={isGeneratingSummary}
                            className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600   font-semibold py-2 px-4 rounded-lg transition-colors border border-indigo-200  disabled:opacity-50"
                        >
                            <Sparkles className={`w-4 h-4 ${isGeneratingSummary ? 'animate-spin' : ''}`} />
                            {isGeneratingSummary ? 'Analyzing...' : 'Summarize Ticket'}
                        </button>
                    </div>
                </div>

                {/* Ticket History Area (Scrollable Grid) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 /50">

                    {/* AI Summary Result Box */}
                    {aiSummary && (
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50   border border-indigo-200  p-4 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-4 mb-6">
                            <h3 className="text-sm font-bold text-indigo-800  flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4" /> AI Ticket Summary
                            </h3>
                            <p className="text-sm text-indigo-900  leading-relaxed">
                                {aiSummary}
                            </p>
                        </div>
                    )}

                    {/* Timeline Grid Boxes */}
                    {ticket.events.map((event) => (
                        <div key={event.id} className="w-full">
                            {/* System Logs are small and centered */}
                            {event.type === 'SYSTEM_LOG' ? (
                                <div className="flex justify-center my-4">
                                    <span className="bg-slate-200  text-slate-500 text-xs px-3 py-1 rounded-full flex items-center gap-2 font-medium">
                                        <History className="w-3 h-3" /> {event.text} ({event.timestamp})
                                    </span>
                                </div>
                            ) : (
                                /* Event Card Box */
                                <div className={`p-4 rounded-xl border shadow-sm ${event.type === 'INTERNAL_NOTE'
                                        ? 'bg-yellow-50  border-yellow-200/50' // Internal notes are yellow
                                        : 'bg-white border-slate-200 ' // Normal replies
                                    }`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-800  text-sm">{event.author}</span>
                                            {event.type === 'INTERNAL_NOTE' && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-200  text-yellow-800  px-2 py-0.5 rounded-md">
                                                    <Lock className="w-3 h-3" /> Internal Note
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">{event.timestamp}</span>
                                    </div>
                                    <p className={`text-sm leading-relaxed ${event.type === 'INTERNAL_NOTE' ? 'text-yellow-900' : 'text-slate-700 '}`}>
                                        {event.text}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Ticket Action Area (Input) */}
                <div className="p-4 bg-white border-t border-slate-200 ">
                    <div className="flex items-center gap-4 mb-3">
                        <button
                            onClick={() => setReplyType('PUBLIC')}
                            className={`text-sm font-bold pb-1 transition-colors border-b-2 ${replyType === 'PUBLIC' ? 'text-primary-600 border-primary-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                        >
                            Public Reply (Citizen)
                        </button>
                        <button
                            onClick={() => setReplyType('INTERNAL')}
                            className={`text-sm font-bold pb-1 transition-colors border-b-2 flex items-center gap-1 ${replyType === 'INTERNAL' ? 'text-yellow-600 border-yellow-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                        >
                            <Lock className="w-3 h-3" /> Internal Note
                        </button>
                    </div>

                    <form onSubmit={handleSendAction} className="flex flex-col gap-3">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={replyType === 'INTERNAL' ? 'Type a private note for other admins...' : 'Type your official response to the citizen...'}
                            className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all resize-none h-24 ${replyType === 'INTERNAL'
                                    ? 'bg-yellow-50  border-yellow-200 focus:ring-yellow-500 text-yellow-900  placeholder:text-yellow-700/50'
                                    : 'bg-slate-50  border-slate-200  focus:ring-primary-500 text-slate-800 '
                                }`}
                        />
                        <div className="flex justify-between items-center">
                            <button type="button" className="btn-secondary !py-2 !px-3 text-xs">
                                <CheckCircle className="w-4 h-4 text-green-600" /> Mark as Resolved
                            </button>
                            <button type="submit" className={`flex items-center gap-2 font-bold py-2 px-6 rounded-lg text-white transition-colors shadow-sm ${replyType === 'INTERNAL' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-primary-500 hover:bg-primary-600'
                                }`}>
                                {replyType === 'INTERNAL' ? 'Save Note' : 'Send Reply'} <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* RIGHT PANE (40%): Contextual User Sidebar */}
            <div className="w-full lg:w-96 bg-slate-50  flex flex-col overflow-y-auto border-l border-slate-200  transition-colors duration-300">
                <div className="p-6 space-y-6">

                    {/* Citizen Profile Context */}
                    <div className="admin-card border-t-4 border-t-primary-500">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <User className="w-4 h-4" /> Citizen Profile
                        </h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary-100  text-primary-700  rounded-full flex items-center justify-center font-bold text-xl">
                                {ticket.context.user.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 ">{ticket.context.user.name}</h4>
                                <p className="text-xs text-slate-500">ID: {ticket.context.user.userId}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between border-b border-slate-100  pb-2">
                                <span className="text-slate-500 flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</span>
                                <span className="font-medium text-slate-800 ">{ticket.context.user.phone}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-100  pb-2">
                                <span className="text-slate-500 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</span>
                                <span className="font-medium text-slate-800  truncate max-w-[120px]" title={ticket.context.user.email}>
                                    {ticket.context.user.email}
                                </span>
                            </div>
                            <div className="flex items-center justify-between pb-1">
                                <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Account Age</span>
                                <span className="font-medium text-slate-800 ">{ticket.context.user.accountAge}</span>
                            </div>
                        </div>
                    </div>

                    {/* Related Service Context */}
                    <div className="admin-card">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Related Service
                        </h3>
                        <div className="bg-slate-50  p-4 rounded-lg border border-slate-200 ">
                            <p className="font-bold text-slate-800  text-sm mb-1">{ticket.context.relatedService.serviceName}</p>
                            <p className="text-xs text-slate-500 mb-3">Service ID: {ticket.context.relatedService.serviceId}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">Current Status:</span>
                                <span className="px-2 py-1 text-xs font-bold bg-orange-100 text-orange-700   rounded-md border border-orange-200 ">
                                    {ticket.context.relatedService.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Admin Quick Actions */}
                    <div className="space-y-3">
                        <button className="btn-secondary w-full">
                            <MessageSquare className="w-4 h-4" /> View Other Tickets
                        </button>
                        <button className="btn-danger w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 shadow-sm">
                            <AlertTriangle className="w-4 h-4" /> Escalate to Super Admin
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}