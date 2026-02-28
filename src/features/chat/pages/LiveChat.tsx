import { useState, useEffect, useRef } from 'react'
import {
    Send,
    User,
    Clock,
    Search,
    Phone,
    Mail,
    Circle,
    MoreVertical,
    Paperclip,
    ArrowLeft
} from 'lucide-react'

const MOCK_SESSIONS = [
    { id: 'chat-1', userName: 'Rahul Kumar', lastMessage: 'Is my passport ready?', time: '10:30 AM', unread: 2, status: 'online' },
    { id: 'chat-2', userName: 'Priya Sharma', lastMessage: 'Thank you for the help.', time: '10:15 AM', unread: 0, status: 'offline' },
    { id: 'chat-3', userName: 'Amit Singh', lastMessage: 'I cannot upload my document.', time: '09:45 AM', unread: 0, status: 'online' },
]

export default function LiveChat() {
    const [activeChatId, setActiveChatId] = useState('chat-1')
    const [messageText, setMessageText] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

    const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setIsConnected(true)

        pingIntervalRef.current = setInterval(() => {
            console.log('Pinging server...')
        }, 5000)

        return () => {
            if (pingIntervalRef.current) clearInterval(pingIntervalRef.current)
            setIsConnected(false)
        }
    }, [])

    const activeSession = MOCK_SESSIONS.find(s => s.id === activeChatId)

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!messageText.trim()) return
        alert(`Message sent: ${messageText}`)
        setMessageText('')
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-slate-50 transition-colors duration-300">

            {/* LEFT PANE */}
            <div
                className={`
                    ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}
                    w-full md:w-80
                    bg-white border-r border-slate-200
                    flex-col z-10 transition-colors duration-300
                `}
            >
                <div className="p-4 border-b border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-800">Active Chats</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-500 font-medium">Server</span>
                            <span
                                className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}
                            ></span>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {MOCK_SESSIONS.map(session => (
                        <div
                            key={session.id}
                            onClick={() => {
                                setActiveChatId(session.id)
                                setIsMobileChatOpen(true)
                            }}
                            className={`p-4 border-b border-slate-50 cursor-pointer transition-colors ${activeChatId === session.id
                                    ? 'bg-primary-50 border-l-4 border-l-primary-500'
                                    : 'border-l-4 border-l-transparent hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                                    {session.userName}
                                    {session.status === 'online' && (
                                        <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                                    )}
                                </h3>
                                <span className="text-xs text-slate-400">{session.time}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-sm text-slate-500 truncate pr-2">
                                    {session.lastMessage}
                                </p>
                                {session.unread > 0 && (
                                    <span className="w-5 h-5 bg-primary-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                                        {session.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MIDDLE PANE */}
            <div
                className={`
                    ${isMobileChatOpen ? 'flex' : 'hidden md:flex'}
                    flex-1 flex-col min-w-0 bg-slate-50/50 transition-colors duration-300
                `}
            >
                {/* HEADER */}
                <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm z-10 transition-colors duration-300">
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setIsMobileChatOpen(false)}
                            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-primary-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                            {activeSession?.userName.charAt(0)}
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-800">
                                {activeSession?.userName}
                            </h2>
                            <p
                                className={`text-xs font-medium ${activeSession?.status === 'online'
                                        ? 'text-green-600'
                                        : 'text-slate-400'
                                    }`}
                            >
                                {activeSession?.status === 'online' ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>

                    <button className="text-slate-400 hover:text-slate-700 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] sm:max-w-[70%] shadow-sm">
                            <p className="text-sm">Hello, I applied for my passport renewal but it's stuck.</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">10:28 AM</span>
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] sm:max-w-[70%] shadow-sm">
                            <p className="text-sm">Is my passport ready?</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">10:30 AM</span>
                        </div>
                    </div>
                </div>

                {/* INPUT */}
                <div className="p-4 bg-white border-t border-slate-200 transition-colors duration-300">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>

                        <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 text-slate-800 transition-all"
                        />

                        <button
                            type="submit"
                            className="p-2.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-sm"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT PANE - DESKTOP ONLY */}
            <div className="w-80 bg-white border-l border-slate-200 hidden xl:flex flex-col overflow-y-auto z-10 transition-colors duration-300">
                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-3xl mb-3 border-4 border-white shadow-md">
                            {activeSession?.userName.charAt(0)}
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">
                            {activeSession?.userName}
                        </h3>
                        <p className="text-sm text-slate-500">Citizen Account</p>
                    </div>

                    <div className="space-y-4">
                        <div className="admin-card !p-4 border border-slate-100 rounded-xl bg-slate-50">
                            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                                <User className="w-4 h-4" /> Contact Info
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Phone
                                    </span>
                                    <span className="font-medium text-slate-800">+91-9876543210</span>
                                </div>

                                <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                                    <span className="text-slate-500 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email
                                    </span>
                                    <span className="font-medium text-slate-800 truncate">
                                        rahul.k@example.com
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1 pb-1">
                                    <span className="text-slate-500 flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Joined
                                    </span>
                                    <span className="font-medium text-slate-800">October 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}