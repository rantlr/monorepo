// @flow

import * as React from 'react';
import { css } from 'react-emotion';
import { colors } from './styles';

const ErrorMessage = ({
  children,
}: {
  children: React.Node | typeof undefined,
}) => {
  if (!children) {
    return null;
  }

  return (
    <p
      className={css`
        color: ${colors.error};
      `}
    >
      {children}
    </p>
  );
};

export default ErrorMessage;
