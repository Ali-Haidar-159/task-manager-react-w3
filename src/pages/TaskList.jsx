import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const TaskList = () => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all'); //********** */
  const tasksPerPage = 20;
  
  // Fetch tasks using custom hook
  const { data: tasks, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=200'
  );



  //********** */
// Filter tasks based on search term and status
  const filteredTasks = tasks 
    ? tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' 
          ? true 
          : filterStatus === 'completed' 
            ? task.completed 
            : !task.completed;
        return matchesSearch && matchesStatus;
      })
    : [];
  
  // Calculate statistics
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(t => t.completed).length || 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  //********** */

  
  
  // Pagination calculations
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className={`container mt-4 pb-5 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
      <div className="row mb-4">
        <div className="col">
          <h2 className="mb-0">Task List</h2>
          <p className={theme === 'dark' ? 'text-white-50' : 'text-muted'}>
            Total tasks: {filteredTasks.length}
          </p>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks by title..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Task Cards */}
      <div className="row">
        {currentTasks.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No tasks found matching your search.
            </div>
          </div>
        ) : (
          currentTasks.map(task => (
            <div key={task.id} className="col-md-6 col-lg-4 mb-4">
              <div 
                className={`card h-100 shadow-sm ${task.completed ? 'border-success' : ''}`}
                style={{ 
                  backgroundColor: theme === 'dark' ? '#2d3748' : '#fff',
                  borderWidth: task.completed ? '3px' : '1px',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h6 className={`mb-0 ${theme === 'dark' ? 'text-white' : 'text-muted'}`}>
                      Task - {task.id}
                    </h6>
                    {task.completed && (
                      <span className="badge bg-success">✓ Done</span>
                    )}
                    {!task.completed && (
                      <span className="badge bg-warning text-dark">Pending</span>
                    )}
                  </div>
                  
                  <p className={`card-text flex-grow-1 ${theme === 'dark' ? 'text-white' : ''}`}>
                    {task.title}
                  </p>
                  
                  <Link 
                    to={`/tasks/${task.id}`} 
                    className="btn btn-primary btn-sm mt-2"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="row mt-4">
          <div className="col">
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                
                {[...Array(totalPages)].map((_, index) => (
                  <li 
                    key={index + 1} 
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
            
            <p className={`text-center ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
