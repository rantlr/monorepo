import * as React from 'react';
import { css } from 'react-emotion';
import { spacing } from './styles';

const Button = ({ children, ...props }) => (
  <button
    className={css`
      margin-top: ${spacing.medium};
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
