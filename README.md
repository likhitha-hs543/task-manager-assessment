# Task Manager Assessment

A professional task management application built with React.js, Vite, and Tailwind CSS.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete tasks
- 🔍 **Search & Filter**: Debounced search with elastic search flow, filter by status and priority
- 🔐 **Authentication**: Simple email/password login with session management
- 📊 **Statistics Dashboard**: Real-time task analytics and completion rates
- 📧 **Email Automation**: Simulated cron job checking for tasks due soon every 30 seconds
- 🎨 **Professional UI**: Modern design with Tailwind CSS, glassmorphism effects
- 🌓 **Dark Mode**: Light and dark theme support
- 📱 **Responsive**: Mobile-friendly design

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API + Custom Hooks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/likhitha-hs543/task-manager-assessment.git
cd task-manager-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Login Credentials

For demo purposes, you can use any valid email and a password with at least 6 characters:
- Email: demo@example.com
- Password: demo123

## Project Structure

```
src/
├── components/
│   ├── Auth/           # Login and ProtectedRoute components
│   ├── Dashboard/      # Dashboard, Header, Statistics
│   ├── Tasks/          # TaskForm, TaskItem, TaskList
│   ├── Filters/        # SearchBar, FilterBar
│   └── UI/             # Reusable components (Button, Input, Modal, Badge)
├── contexts/           # Auth and Task context providers
├── hooks/              # Custom hooks (useDebounce, useEmailAutomation)
├── utils/              # Helper functions and constants
└── App.jsx             # Main app with routing
```

## Key Features Implementation

### 1. CRUD Operations
- Add tasks with title, description, priority, and due date
- Edit tasks (inline or modal)
- Delete tasks with confirmation
- Toggle task completion status
- All tasks persist in localStorage

### 2. Search & Filtering
- **Debounced Search**: 500ms delay to optimize performance
- **Elastic Search Flow**: Input → Debounce → Filter → Render
- **Case-insensitive**: Partial substring matching
- **Filters**: Status (All/Completed/Pending), Priority (All/High/Medium/Low)

### 3. Session Management
- Login with email/password
- Session stored in sessionStorage
- Protected routes redirect to login if not authenticated
- Session clears when browser tab closes

### 4. Email Automation
- Simulated cron job runs every 30 seconds (configurable to 20 minutes)
- Checks for tasks due within 24 hours
- Generates mock email notifications
- Displays notifications in UI with badge counter
- Console logs for demo verification

### 5. Statistics Dashboard
- Total tasks count
- Completed/Pending/Overdue counts
- Completion rate percentage with progress bar
- Real-time updates as tasks change

## Assessment Requirements Compliance

✅ React hooks for state management  
✅ Tailwind CSS for styling  
✅ Reusable components with props  
✅ Clean code with comments  
✅ Proper naming conventions  
✅ All CRUD operations  
✅ Filtering & Search with debouncing  
✅ Login screen with session storage  
✅ Elastic search flow implementation  
✅ Email automation (simulated cron)  
✅ Professional UI/UX design  

## Demo Video

### 📹 Complete Feature Demonstration

A comprehensive 1-2 minute video demonstration showcasing all implemented features.

**🎥 Watch the Demo Video**: [task-manager-demo.mp4](./demo/task-manager-demo.mp4)

> Click the link above to download and watch the demo video

### Features Demonstrated:
- ✅ **Login & Authentication** - Email/password with session storage
- ✅ **CRUD Operations** - Create, Read, Update, Delete tasks
- ✅ **Search & Filter** - Debounced search with status and priority filters
- ✅ **Email Automation** - 30-second cron checking tasks due within 24 hours
- ✅ **Statistics Dashboard** - Real-time task analytics
- ✅ **Dark/Light Mode** - Theme toggle with persistence
- ✅ **Session Management** - Protected routes and logout

> **Note**: Demo video also submitted via email to nelo.careers@gmail.com

## Author

Likhitha HS  
GitHub: [@likhitha-hs543](https://github.com/likhitha-hs543)

## Assessment

This project was created as part of a React.js/Node.js technical assessment.
