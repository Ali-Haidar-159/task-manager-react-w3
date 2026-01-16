import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  return (
    <div className={`container mt-5 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
      <div className="row justify-content-center text-center">
        <div className="col-md-6">
          <div className="mb-4">
            <h1 className="display-1 fw-bold">404</h1>
            <div className="fs-1 mb-3">🔍</div>
            <h2 className="mb-3">Page Not Found</h2>
            <p className={`lead mb-4 ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
              Oops! The page you are looking for does not exist.
            </p>
          </div>
          
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button 
              className="btn btn-primary btn-lg px-4" 
              onClick={() => navigate('/')}
            >
              Go to Home
            </button>
            <button 
              className="btn btn-outline-secondary btn-lg px-4" 
              onClick={() => navigate('/tasks')}
            >
              View Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;