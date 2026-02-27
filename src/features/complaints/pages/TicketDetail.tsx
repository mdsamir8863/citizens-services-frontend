import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Sparkles, Lock, CheckCircle } from 'lucide-react'
import { mockTicketApi, ComplaintTicket } from '../data/mockTicketApi'
import TicketSidebar from '../components/TicketSidebar'

export default function TicketDetail() {
    const { ticketId } = useParams()
    const navigate = useNavigate()

    const [ticket, setTicket] = useState<ComplaintTicket | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const [replyText, setReplyText] = useState('')
    const [replyType, setReplyType] = useState<'PUBLIC' | 'INTERNAL'>('PUBLIC')

    useEffect(() => {
        const fetchTicket = async () => {
            if (!ticketId) return
            setIsLoading(true)
            try {
                const data = await mockTicketApi.getTicketById(ticketId)
                if (data) setTicket(data)
            } catch (error) {
                console.error("Error fetching ticket", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTicket()
    }, [ticketId])

    const handleSendAction = (e: React.FormEvent) => {
        e.preventDefault()
        if (!replyText.trim()) return
        alert(`${replyType === 'INTERNAL' ? 'Internal Note' : 'Public Reply'} sent successfully.`)
        setReplyText('')
    }

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    if (!ticket) {
        return (
            <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center text-slate-500">
                <h2 className="text-2xl font-bold mb-2">Ticket Not Found</h2>
                <button
                    onClick={() => navigate('/complaints')}
                    className="text-primary-600 hover:underline"
                >
                    &larr; Back to Inbox
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-slate-50 transition-colors duration-300">

            {/* LEFT PANE */}
            <div className="flex-1 flex flex-col border-r border-slate-200 bg-white transition-colors duration-300">

                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/complaints')}
                            className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 text-slate-600" />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                {ticket.title}
                                <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-md border border-yellow-200">
                                    {ticket.status}
                                </span>
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Ticket ID: {ticket.id} • {ticket.category}
                            </p>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold py-2 px-4 rounded-lg transition-colors border border-indigo-200">
                        <Sparkles className="w-4 h-4" />
                        Summarize Ticket
                    </button>
                </div>

                {/* Timeline */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex items-center justify-center text-slate-400">
                    <p className="text-sm">No message history yet. Ticket just opened.</p>
                </div>

                {/* Reply Box */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <div className="flex items-center gap-4 mb-3">
                        <button
                            onClick={() => setReplyType('PUBLIC')}
                            className={`text-sm font-bold pb-1 transition-colors border-b-2 ${replyType === 'PUBLIC'
                                    ? 'text-primary-600 border-primary-600'
                                    : 'text-slate-400 border-transparent hover:text-slate-600'
                                }`}
                        >
                            Public Reply (Citizen)
                        </button>

                        <button
                            onClick={() => setReplyType('INTERNAL')}
                            className={`text-sm font-bold pb-1 transition-colors border-b-2 flex items-center gap-1 ${replyType === 'INTERNAL'
                                    ? 'text-yellow-600 border-yellow-600'
                                    : 'text-slate-400 border-transparent hover:text-slate-600'
                                }`}
                        >
                            <Lock className="w-3 h-3" />
                            Internal Note
                        </button>
                    </div>

                    <form onSubmit={handleSendAction} className="flex flex-col gap-3">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={
                                replyType === 'INTERNAL'
                                    ? 'Type a private note for other admins...'
                                    : 'Type your official response to the citizen...'
                            }
                            className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all resize-none h-24 ${replyType === 'INTERNAL'
                                    ? 'bg-yellow-50 border-yellow-200 focus:ring-yellow-500 text-yellow-900 placeholder:text-yellow-700/50'
                                    : 'bg-slate-50 border-slate-200 focus:ring-primary-500 text-slate-800'
                                }`}
                        />

                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                className="btn-secondary !py-2 !px-3 text-xs"
                            >
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                Mark as Resolved
                            </button>

                            <button
                                type="submit"
                                className={`flex items-center gap-2 font-bold py-2 px-6 rounded-lg text-white transition-colors shadow-sm ${replyType === 'INTERNAL'
                                        ? 'bg-yellow-600 hover:bg-yellow-700'
                                        : 'bg-primary-500 hover:bg-primary-600'
                                    }`}
                            >
                                {replyType === 'INTERNAL' ? 'Save Note' : 'Send Reply'}
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* RIGHT PANE */}
            <TicketSidebar ticket={ticket} />
        </div>
    )
}