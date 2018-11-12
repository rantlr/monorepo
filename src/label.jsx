import * as React from 'react';
import { css } from 'react-emotion';
import { spacing } from './styles';

const Label = ({ text, children }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      margin-top: ${spacing.medium};
    `}
  >
    <label>{text}</label>
    {children}
  </div>
);

export default Label;
