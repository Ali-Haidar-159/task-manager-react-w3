# Task Manager Application

A modern, responsive task management application built with React and Bootstrap. This project demonstrates React best practices including custom hooks, context API, React Router, and component-based architecture.

## Features

###  Core Functionality
- **Task List Management** - View all tasks with pagination
- **Task Details** - Detailed view of individual tasks
- **Search Functionality** - Filter tasks by title in real-time
- **Mark as Done** - Toggle task completion status

### Design Features
- **Light/Dark Theme** - Toggle between light and dark modes
- **Responsive Design** - Mobile-first design that works on all devices
- **Modern UI** - Beautiful gradient cards with smooth animations
- **Interactive Elements** - Hover effects and smooth transitions
- **Professional Styling** - Clean, modern interface using Bootstrap

### Architecture
- **MVC-like Structure** - Clean separation of concerns
- **Custom Hooks** - Reusable `useFetch` hook for data fetching
- **Context API** - Global state management for theme
- **React Router** - Client-side routing with dynamic routes
- **Component Reusability** - Modular, reusable components


### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Ali-Haidar-159/task-manager-react-w3.git
   cd task-manager
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm start
```


##  API Integration

**Base URL**: `https://jsonplaceholder.typicode.com`

### Endpoints Used:
- `GET /todos?_limit=200` - Fetch task list
- `GET /todos/:id` - Fetch single task

## Routes

### Home Page (`/`)
- Welcome screen

### Task List (`/tasks`)
- Show all the tasks

### Task Details (`/tasks/:id`)
- Detailed task information
- Mark as Done/Pending toggle



## Error Handling

- Loading states during data fetch
- Error messages for failed requests
- 404 page for invalid routes


## Learning Resources

- [React Documentation](https://reactjs.org/)






