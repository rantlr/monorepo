// @flow

import * as React from 'react';
import { css } from 'react-emotion';
import Button from './button';
import formatDate from './date-formatter';
import ErrorMessage from './error-message';
import { spacing } from './styles';
import type { Rant as IRant } from './types';

type Props = IRant & {
  onDelete: () => void,
};

interface State {
  error?: string;
}

export default class Rant extends React.PureComponent<Props, State> {
  state = {};

  render() {
    const {
      id,
      title,
      background,
      created_at,
      updated_at,
      onDelete,
    } = this.props;

    const { error } = this.state;

    return (
      <article
        className={css`
          border: 'solid black 1px';
          padding: ${spacing.tiny};
        `}
      >
        <h1>{title}</h1>
        <p>{background}</p>
        <Button
          type="button"
          onClick={async () => {
            if (
              window.confirm(
                `Are you sure you want to delete this rant? "${title}"`
              )
            ) {
              const response = await fetch(`/rants/${id}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                onDelete();
              } else {
                this.setState({ error: await response.text() });
              }
            }
          }}
        >
          Delete
        </Button>
        <p>Created at {formatDate(created_at)}</p>
        <p>Updated at {formatDate(updated_at)}</p>
        <ErrorMessage>{error}</ErrorMessage>
      </article>
    );
  }
}
