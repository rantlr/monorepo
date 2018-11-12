import * as React from 'react';

const Button = ({ children, ...props }) => (
  <button style={{ marginTop: 8 }} {...props}>
    {children}
  </button>
);

export default Button;
