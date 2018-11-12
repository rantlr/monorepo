import * as React from 'react';

const ErrorMessage = ({ children }) => {
  if (!children) {
    return null;
  }

  return <p style={{ color: 'red' }}>{children}</p>;
};

export default ErrorMessage;
