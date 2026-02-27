// 1. Strict TypeScript Interfaces (Exported so we can use them across the app)
export type TicketCategory = 'Passport Service' | 'Civic Issue' | 'Home Service' | 'General Query'
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'ESCALATED' | 'RESOLVED'

export interface ContextUser {
    userId: string
    name: string
    email: string
    phone: string
    accountAge: string
}

export interface ContextService {
    serviceId: string
    serviceName: string
    status: string
}

export interface TicketEvent {
    id: string
    type: 'CITIZEN_REPLY' | 'ADMIN_REPLY' | 'INTERNAL_NOTE' | 'SYSTEM_LOG'
    author: string
    text: string
    timestamp: string
}

export interface ComplaintTicket {
    id: string
    title: string
    category: TicketCategory
    status: TicketStatus
    createdAt: string
    events: TicketEvent[]
    context: {
        user: ContextUser
        relatedService?: ContextService // Optional because Civic Issues might not have a personal service ID
        location?: string // Used specifically for Civic Issues (like Potholes)
    }
}

// 2. The Mock Database
const MOCK_TICKETS_DB: ComplaintTicket[] = [
    {
        id: 'CMP-1029',
        title: 'Delay in Passport Renewal Verification',
        category: 'Passport Service',
        status: 'OPEN',
        createdAt: '2026-02-26',
        events: [], // Truncated for the list view
        context: {
            user: { userId: 'USR-445', name: 'Rahul Kumar', email: 'rahul@example.com', phone: '+91-9876543210', accountAge: '2 years' },
            relatedService: { serviceId: 'SRV-99', serviceName: 'Passport Renewal (Tatkal)', status: 'Pending Police Verification' }
        }
    },
    {
        id: 'CMP-1030',
        title: 'Huge Pothole causing accidents on MG Road',
        category: 'Civic Issue',
        status: 'ESCALATED',
        createdAt: '2026-02-27',
        events: [],
        context: {
            user: { userId: 'USR-892', name: 'Amit Singh', email: 'amit.s@example.com', phone: '+91-9988776655', accountAge: '5 months' },
            location: 'MG Road, near City Center Mall, Pillar 45' // No relatedService, just location!
        }
    },
    {
        id: 'CMP-1031',
        title: 'Plumber did not arrive for scheduled booking',
        category: 'Home Service',
        status: 'IN_PROGRESS',
        createdAt: '2026-02-27',
        events: [],
        context: {
            user: { userId: 'USR-102', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91-9123456780', accountAge: '3 years' },
            relatedService: { serviceId: 'SRV-105', serviceName: 'Plumbing (Leakage Repair)', status: 'Assigned to Technician' }
        }
    },
    {
        id: 'CMP-1032',
        title: 'Payment deducted but Ration Card not updated',
        category: 'General Query',
        status: 'RESOLVED',
        createdAt: '2026-02-25',
        events: [],
        context: {
            user: { userId: 'USR-776', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91-9876500000', accountAge: '1 year' },
            relatedService: { serviceId: 'SRV-12', serviceName: 'Ration Card Renewal', status: 'Completed' }
        }
    }
]

// 3. Fake API Methods (Simulating Network Delay)
export const mockTicketApi = {
    // Fetch all tickets for the Inbox List
    getAllTickets: async (): Promise<ComplaintTicket[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_TICKETS_DB)
            }, 800) // 800ms fake network delay
        })
    },

    // Fetch a single ticket by ID for the Detail View
    getTicketById: async (id: string): Promise<ComplaintTicket | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const ticket = MOCK_TICKETS_DB.find(t => t.id === id)
                resolve(ticket)
            }, 600)
        })
    }
}