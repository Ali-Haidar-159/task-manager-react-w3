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
          
          <Link to="/tasks" className="btn btn-primary btn-lg px-5">
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
