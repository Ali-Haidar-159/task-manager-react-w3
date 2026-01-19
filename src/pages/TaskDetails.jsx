import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { updateTaskStatus } from '../utils/storage';

const TaskDetails = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Local state to manage task completion
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [taskData, setTaskData] = useState(null);
  
  // Fetch single task with local storage
  const { data: task, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  
  // Update local state when task data is loaded
  useEffect(() => {
    if (task) {
      setTaskData(task);
      setIsCompleted(task.completed);
    }
  }, [task]);
  
  // Handle mark as done
  const handleMarkAsDone = () => {
    setIsCompleted(true);
    setShowSuccessMessage(true);
    
    // Update task in localStorage using utility function
    const updatedTask = updateTaskStatus(id, true);
    if (updatedTask) {
      setTaskData(updatedTask);
    }
    
    // Hide success message after 10 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000);
  };
  
  // Handle mark as pending
  const handleMarkAsPending = () => {
    setIsCompleted(false);
    
    // Update task in localStorage using utility function
    const updatedTask = updateTaskStatus(id, false);
    if (updatedTask) {
      setTaskData(updatedTask);
    }
  };
  
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  
  const displayTask = taskData || task;
  
  return (
    <div className={`container mt-4 pb-5 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
      <button 
        className="btn btn-secondary mb-4" 
        onClick={() => navigate('/tasks')}
      >
        ← Back to Tasks
      </button>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>🎉 Success!</strong> Task has been marked as completed and saved to local storage.
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowSuccessMessage(false)}
          ></button>
        </div>
      )}
      
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div 
            className={`card shadow ${isCompleted ? 'border-success' : 'border-warning'}`}
            style={{ 
              backgroundColor: theme === 'dark' ? '#2d3748' : '#fff',
              borderWidth: '3px'
            }}
          >
            <div 
              className={`card-header ${isCompleted ? 'bg-success' : 'bg-warning'} text-white`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Task Details</h3>
                {isCompleted && <span className="badge bg-light text-success fs-6">✓ Completed</span>}
                {!isCompleted && <span className="badge bg-light text-warning fs-6">⏳ Pending</span>}
              </div>
            </div>
            
            <div className="card-body p-4">
              <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                    <strong className={`d-block mb-2 ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                      Task ID
                    </strong>
                    <p className={`h4 mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>
                      #{displayTask?.id}
                    </p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                    <strong className={`d-block mb-2 ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                      User ID
                    </strong>
                    <p className={`h4 mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>
                      #{displayTask?.userId}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <strong className={`d-block mb-2 ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                  Title
                </strong>
                <p className={`h5 ${theme === 'dark' ? 'text-white' : ''}`}>
                  {displayTask?.title}
                </p>
              </div>
              
              <div className="mb-4">
                <strong className={`d-block mb-3 ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
                  Current Status
                </strong>
                <div>
                  {isCompleted ? (
                    <div className="alert alert-success d-flex align-items-center mb-0">
                      <span className="fs-3 me-3">✓</span>
                      <div className="flex-grow-1">
                        <h5 className="mb-0">Completed</h5>
                        <p className="mb-0 small">This task has been marked as done and saved to localStorage.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-warning d-flex align-items-center mb-0">
                      <span className="fs-3 me-3">⏳</span>
                      <div className="flex-grow-1">
                        <h5 className="mb-0">Pending</h5>
                        <p className="mb-0 small">This task is still in progress.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="d-grid gap-2 d-md-flex">
                {!isCompleted ? (
                  <button 
                    className="btn btn-success btn-lg flex-fill"
                    onClick={handleMarkAsDone}
                  >
                    <span className="me-2">✓</span> Mark as Done
                  </button>
                ) : (
                  <button 
                    className="btn btn-warning btn-lg flex-fill"
                    onClick={handleMarkAsPending}
                  >
                    <span className="me-2">↺</span> Mark as Pending
                  </button>
                )}
              </div>
            </div>
            
            <div className="card-footer bg-transparent border-top">
              <button 
                className="btn btn-primary w-100" 
                onClick={() => navigate('/tasks')}
              >
                View All Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
