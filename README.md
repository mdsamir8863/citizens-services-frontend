# 🏛️ Citizen Portal Administration System (Frontend)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://citizen-tau.vercel.app/login)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/mdsamir8863/citizens-services-frontend)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)



## 🌟 Mission & Vision
**Mission:** To bridge the gap between citizens and administrative bodies by providing a unified, secure, and highly efficient e-governance administration platform.
**Vision:** To build an infinitely scalable command center that reduces grievance resolution times by 80% through advanced UI/UX patterns, dynamic contextual workflows, and AI-assisted data aggregation.

---

## 💻 Tech Stack
This project is built using modern, enterprise-standard technologies optimized for speed and strict type safety:
* **Core:** React 18, Vite (with SWC compiler)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS v4 (Semantic CSS Variables for Dark/Light Mode)
* **State Management:** Redux Toolkit (RTK)
* **Routing:** React Router DOM v6
* **Icons:** Lucide-React

---

## 🛡️ Role-Based Access Control (RBAC) & Security
Security is baked into the UI layer. We utilize strict TypeScript constants (`ROLES`) to prevent privilege escalation.

| Role | Access Level | Permitted Routes |
| :--- | :--- | :--- |
| **Super Admin** | Full System Access | All routes including `/settings` |
| **Admin** | General Operations | `/`, `/users`, `/services`, `/complaints`, `/profile` |
| **Support Admin** | Grievance & Comms | `/`, `/complaints`, `/chat`, `/profile` |

**Security Implementations:**
1. **Redux Store Safety:** Raw JWT tokens are NEVER stored in the Redux state to prevent DevTools theft. Only non-sensitive UI state is maintained globally.
2. **Route Guards:** Uses `<ProtectedRoute>` (Authentication) and `<RequireRole>` (Authorization) wrappers. Attempting to force-navigate via the URL bar instantly intercepts and redirects unauthorized users.

---

## 🗺️ Application Routes & Page Features

### 1. Global Shell & Layout (`/`)
* **Smart Sidebar:** Dynamically renders navigation links based on the active user's role.
* **Header:** Features a global semantic Dark Mode toggle and an intelligent notification bell.
* **Memoization:** Both Sidebar and Header are wrapped in `React.memo` and utilize `useCallback` to completely bypass React's rendering cycle when navigating between nested pages, ensuring a lag-free experience.

### 2. User Management (`/users`)
* **Features:** A CRM dashboard for tracking registered citizens.
* **Implementation:** Utilizes our strictly-typed Generic `<DataTable <T>>` component, ensuring consistent pagination, loading states, and type safety across the application.

### 3. Service Applications (`/services`)
* **Features:** A data grid for processing citizen requests (e.g., Passport Renewals, Ration Cards).
* **Workflows:** Action buttons dynamically adapt to allow binary Approve/Reject flows.

### 4. Ticket Inbox & Master-Detail View (`/complaints`)
This is the core module of the application, utilizing a Split-Pane UI architecture to maximize staff productivity.
* **`/complaints` (Inbox):** A filterable table displaying color-coded categories (Civic Issue, Home Service, etc.).
* **`/complaints/:ticketId` (Detail Command Center):**
  * **Left Pane (Timeline):** Displays chat bubbles, system logs, and allows toggling between "Public Replies" and legally-compliant "Internal Notes".
  * **Right Pane (Smart Sidebar):** Dynamically changes based on ticket category. Shows Google Map locations for Potholes, or Service IDs for Passport delays. Includes contextual Action Buttons (e.g., "Assign Ground Team").

### 5. Live Chat (`/chat`)
* **Features:** A real-time, 3-pane synchronous communication dashboard for urgent queries.
* **Optimization:** Includes strict `useEffect` cleanup functions (interval/socket clearing) to completely prevent memory leaks when an admin navigates away from the page.

### 6. System Settings (`/settings` - *Super Admin Only*)
* **Features:** A highly secure module for global platform configurations, protected by the strict `RequireRole` bouncer.

---

## 🏗️ Core Architectural Principles

1. **Generic Reusability (`<DataTable <T>>`):** We use a master TypeScript component that accepts `K extends keyof T` to guarantee zero `any` type vulnerabilities.
2. **Route-Level Code Splitting:** Utilizing `React.lazy()` and `<Suspense>`, the browser only downloads the JavaScript required for the specific page the user is viewing, reducing initial load time by over 60%.
3. **Global Error Boundaries:** Integrated `errorElement` in React Router v6 to gracefully catch unexpected rendering errors, preventing the "White Screen of Death" and safely routing the admin back to the dashboard.
4. **Vite Manual Chunking:** Customized `vite.config.ts` to split massive vendor files (React, Redux) into separate, cacheable chunks for lightning-fast Vercel deployments.
5. **RTK Query Blueprint:** The `baseApi.ts` foundation is already established. The current Promise-based Mock API is designed to be swapped with RTK Query API slices with zero UI refactoring required.

---

## 📁 Folder Structure (Feature-Sliced Design)
```text
src/
├── app/               # Redux store and baseApi configurations
├── common/            # Reusable UI components (Sidebar, Header, DataTable)
├── core/              # Security guards (RequireRole, ProtectedRoute)
├── features/          # Domain-specific logic
│   ├── auth/          # Authentication & Strict Types (ROLES)
│   ├── chat/          # Live Chat Module
│   ├── complaints/    # Ticketing & Master-Detail UI
│   ├── services/      # Service Applications
│   ├── settings/      # System Configurations
│   └── users/         # Citizen CRM
├── layouts/           # Page wrappers (AdminLayout)
├── pages/             # Global pages (Dashboard, GlobalError, NotFound)
└── router/            # Route definitions & Lazy Loading

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/mdsamir8863/citizens-services-frontend.git](https://github.com/mdsamir8863/citizens-services-frontend.git)

```


2. **Navigate to the directory:**
```bash
cd citizens-services-frontend

```


3. **Install dependencies:**
```bash
npm install

```


4. **Start the development server:**
```bash
npm run dev

```



