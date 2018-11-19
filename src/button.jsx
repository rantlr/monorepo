// @flow

import * as React from 'react';
import { css } from 'react-emotion';
import { spacing } from './styles';

type Props = React.ElementConfig<'button'>;

const Button = ({ children, ...props }:Props) => (
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
