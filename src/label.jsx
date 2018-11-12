import * as React from 'react';

const Label = ({ text, children }) => (
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

export default Label;
