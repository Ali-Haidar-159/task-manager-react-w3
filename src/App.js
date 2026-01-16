import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import NotFound from './pages/NotFound';

// App Content Component
const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#1a202c' : '#f8f9fa',
        transition: 'background-color 0.3s ease'
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;