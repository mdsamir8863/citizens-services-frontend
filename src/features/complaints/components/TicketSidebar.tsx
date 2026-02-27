import {
    User,
    FileText,
    AlertTriangle,
    MessageSquare,
    MapPin,
    Wrench,
    ShieldAlert
} from 'lucide-react'
import { ComplaintTicket } from '../data/mockTicketApi'

interface TicketSidebarProps {
    ticket: ComplaintTicket
}

export default function TicketSidebar({ ticket }: TicketSidebarProps) {
    const { context, category } = ticket

    const renderDynamicActions = () => {
        switch (category) {
            case 'Civic Issue':
                return (
                    <>
                        <button className="btn-secondary w-full bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
                            <MapPin className="w-4 h-4" /> View Exact Location
                        </button>
                        <button className="btn-primary w-full !bg-purple-600 hover:!bg-purple-700">
                            <Wrench className="w-4 h-4" /> Assign Ground Team
                        </button>
                    </>
                )
            case 'Home Service':
                return (
                    <>
                        <button className="btn-secondary w-full">
                            <User className="w-4 h-4" /> Contact Technician
                        </button>
                        <button className="btn-primary w-full !bg-orange-600 hover:!bg-orange-700">
                            Reschedule Booking
                        </button>
                    </>
                )
            case 'Passport Service':
                return (
                    <>
                        <button className="btn-secondary w-full">
                            <FileText className="w-4 h-4" /> Open Application Form
                        </button>
                        <button className="btn-primary w-full !bg-blue-600 hover:!bg-blue-700">
                            <ShieldAlert className="w-4 h-4" /> Escalate to Police Dept
                        </button>
                    </>
                )
            default:
                return (
                    <button className="btn-secondary w-full">
                        <MessageSquare className="w-4 h-4" /> Send Help Article
                    </button>
                )
        }
    }

    return (
        <div className="w-full lg:w-96 bg-slate-50 flex flex-col overflow-y-auto border-l border-slate-200 transition-colors duration-300">
            <div className="p-6 space-y-6">

                {/* 1. Citizen Profile Context */}
                <div className="admin-card border-t-4 border-t-primary-500">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" /> Citizen Profile
                    </h3>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-xl">
                            {context.user.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">
                                {context.user.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                                ID: {context.user.userId}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p className="flex justify-between">
                            <span className="text-slate-500">Phone:</span>
                            <span className="font-medium text-slate-800">
                                {context.user.phone}
                            </span>
                        </p>

                        <p className="flex justify-between">
                            <span className="text-slate-500">Email:</span>
                            <span
                                className="font-medium text-slate-800 truncate max-w-[120px]"
                                title={context.user.email}
                            >
                                {context.user.email}
                            </span>
                        </p>
                    </div>
                </div>

                {/* 2. Dynamic Context */}
                <div className="admin-card">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        {category === 'Civic Issue'
                            ? <MapPin className="w-4 h-4" />
                            : <FileText className="w-4 h-4" />}
                        {category === 'Civic Issue'
                            ? 'Incident Location'
                            : 'Related Service'}
                    </h3>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        {category === 'Civic Issue' && context.location ? (
                            <p className="font-medium text-slate-800 text-sm">
                                {context.location}
                            </p>
                        ) : context.relatedService ? (
                            <>
                                <p className="font-bold text-slate-800 text-sm mb-1">
                                    {context.relatedService.serviceName}
                                </p>
                                <p className="text-xs text-slate-500 mb-3">
                                    Service ID: {context.relatedService.serviceId}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500">
                                        Current Status:
                                    </span>
                                    <span className="px-2 py-1 text-xs font-bold bg-orange-100 text-orange-700 rounded-md border border-orange-200">
                                        {context.relatedService.status}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <p className="text-xs text-slate-500">
                                No context available.
                            </p>
                        )}
                    </div>
                </div>

                {/* 3. Dynamic Quick Actions */}
                <div className="space-y-3">
                    {renderDynamicActions()}

                    <div className="pt-4 border-t border-slate-200">
                        <button className="btn-danger w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 shadow-sm">
                            <AlertTriangle className="w-4 h-4" /> Escalate to Super Admin
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}