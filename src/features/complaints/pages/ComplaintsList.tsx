import { useState, useEffect } from 'react'
import { Search, Filter, Eye, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DataTable, { ColumnDef } from '../../../common/components/DataTable'
import { mockTicketApi, ComplaintTicket } from '../data/mockTicketApi'

export default function ComplaintsList() {
    const navigate = useNavigate()

    const [tickets, setTickets] = useState<ComplaintTicket[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchTickets = async () => {
            setIsLoading(true)
            try {
                const data = await mockTicketApi.getAllTickets()
                setTickets(data)
            } catch (error) {
                console.error("Failed to fetch tickets", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchTickets()
    }, [])

    const ticketColumns: ColumnDef<ComplaintTicket>[] = [
        { header: 'Ticket ID', accessorKey: 'id' },
        {
            header: 'Category',
            cell: (ticket) => {
                const catStyles: Record<string, string> = {
                    'Civic Issue': 'bg-purple-100 text-purple-700',
                    'Passport Service': 'bg-blue-100 text-blue-700',
                    'Home Service': 'bg-orange-100 text-orange-700',
                    'General Query': 'bg-slate-100 text-slate-700'
                }

                return (
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border border-transparent ${catStyles[ticket.category] || catStyles['General Query']}`}>
                        {ticket.category}
                    </span>
                )
            }
        },
        {
            header: 'Subject & Citizen',
            cell: (ticket) => (
                <div className="max-w-xs">
                    <p
                        className="font-bold text-slate-800 truncate"
                        title={ticket.title}
                    >
                        {ticket.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                        By: {ticket.context.user.name}
                    </p>
                </div>
            )
        },
        { header: 'Date Raised', accessorKey: 'createdAt' },
        {
            header: 'Status',
            cell: (ticket) => {
                const statusStyles: Record<string, string> = {
                    'RESOLVED': 'bg-green-100 text-green-700 border-green-200',
                    'ESCALATED': 'bg-red-100 text-red-700 border-red-200 animate-pulse',
                    'IN_PROGRESS': 'bg-indigo-100 text-indigo-700 border-indigo-200',
                    'OPEN': 'bg-yellow-100 text-yellow-700 border-yellow-200',
                }

                return (
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusStyles[ticket.status]}`}>
                        {ticket.status.replace('_', ' ')}
                    </span>
                )
            }
        },
        {
            header: 'Action',
            cell: (ticket) => (
                <button
                    onClick={() => navigate(`/complaints/${ticket.id}`)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                >
                    <Eye className="w-4 h-4" /> View Ticket
                </button>
            )
        }
    ]

    return (
        <div className="page-wrapper">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-primary-500" />
                        Ticket Inbox
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage, assign, and resolve citizen issues across all service categories.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder="Search by ID or Subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field !py-2 !pl-9"
                        />
                    </div>

                    <button className="btn-secondary !py-2 flex-shrink-0">
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </div>
            </div>

            <DataTable
                columns={ticketColumns}
                data={tickets}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={1}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}