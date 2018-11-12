import * as React from 'react';

export default ({ children }) => {
  if (!children) {
    return null;
  }

  return <p style={{ color: 'red' }}>{children}</p>;
};
