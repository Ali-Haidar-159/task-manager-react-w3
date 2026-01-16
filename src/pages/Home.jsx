import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`container mt-5 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-3 mb-4">
            Welcome to Task Manager 📋
          </h1>
          <p className="lead mb-5">
            Manage your tasks efficiently with our simple and intuitive task management application.
          </p>
          
          <div 
            className="card mb-4" 
            style={{ 
              backgroundColor: theme === 'dark' ? '#2d3748' : '#fff',
              border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #dee2e6'
            }}
          >
            <div className="card-body">
              <h5 className={`card-title mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>
                Features
              </h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                    <h6 className={theme === 'dark' ? 'text-white' : ''}>✅ View All Tasks</h6>
                    <p className={`mb-0 small ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                      Browse through all your tasks
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                    <h6 className={theme === 'dark' ? 'text-white' : ''}>🔍 Search Tasks</h6>
                    <p className={`mb-0 small ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                      Find tasks by title
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                    <h6 className={theme === 'dark' ? 'text-white' : ''}>📄 Task Details</h6>
                    <p className={`mb-0 small ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                      View detailed information
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                    <h6 className={theme === 'dark' ? 'text-white' : ''}>🌓 Theme Toggle</h6>
                    <p className={`mb-0 small ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                      Light and dark modes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Link to="/tasks" className="btn btn-primary btn-lg px-5">
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;