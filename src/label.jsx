// @flow

import * as React from 'react';
import { css } from 'react-emotion';
import { spacing } from './styles';

interface Props {
  text: string;
  children: React.Node;
}

const Label = (props: Props) => {
  const { text, children } = props;
  return (
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
};

export default Label;
