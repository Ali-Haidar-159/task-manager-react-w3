import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">⚠️ Error!</h4>
        <p className="mb-0">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;