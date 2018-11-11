import * as React from 'react';

export default ({ text, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      marginTop: 8,
    }}
  >
    <label>{text}</label>
    {children}
  </div>
);
