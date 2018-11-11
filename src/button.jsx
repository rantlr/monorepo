import * as React from 'react';

export default ({ children, ...props }) => (
  <button style={{ marginTop: 8 }} {...props}>
    {children}
  </button>
);
