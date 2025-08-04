# Abtech HRMS

A modern, full-featured Human Resource Management System (HRMS) dashboard built with React, TypeScript, Vite, shadcn-ui, and Tailwind CSS.

## Features

- **Dashboard**: Overview of employees, attendance, payroll, and recent activities
- **Employee Directory**: Manage and view employee details
- **Attendance Management**: Track and manage employee attendance (demo)
- **Leave Management**: Handle leave requests and balances (demo)
- **Payroll**: Process payroll and view salary details (demo)
- **Recruitment**: Manage job postings and candidate tracking (demo)
- **Performance**: Review and manage employee performance (demo)
- **Settings & Compliance**: Configure system settings and monitor compliance (demo)
- **Responsive UI**: Works on desktop and mobile
- **Modern UI/UX**: Built with shadcn-ui and Tailwind CSS

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [shadcn-ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for routing
- [TanStack React Query](https://tanstack.com/query/latest) for data management

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd abtech_t

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Project Structure

- `src/`
  - `components/` – UI components (dashboard, layout, UI primitives)
  - `pages/` – Main pages (Dashboard, Employees, NotFound, etc.)
  - `hooks/` – Custom React hooks
  - `lib/` – Utility functions
  - `assets/` – Static images and assets

## Main Pages & Navigation

- **Dashboard** (`/`): HR overview, stats, recent activities, quick actions
- **Employees** (`/employees`): Employee directory and management
- **Attendance** (`/attendance`): Attendance records (demo)
- **Leave** (`/leave`): Leave management (demo)
- **Payroll** (`/payroll`): Payroll processing (demo)
- **Recruitment** (`/recruitment`): Recruitment management (demo)
- **Performance** (`/performance`): Performance reviews (demo)
- **Settings** (`/settings`): System settings (demo)
- **Compliance** (`/compliance`): Compliance monitoring (demo)
- **404 Not Found**: Custom error page for invalid routes


## License

This project is licensed under the MIT License.
