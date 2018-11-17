import * as React from 'react';
import { css } from 'react-emotion';
import formatDate from './date-formatter';
import Button from './button';
import ErrorMessage from './error-message';
import { spacing } from './styles';

export default class Rant extends React.PureComponent {
  state = {
    error: null,
  };

  render() {
    const { id, title, background, created_at, updated_at, onDelete } = this.props;

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
                `Are you sure you want to delete this rant? "${title}"`,
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
        <p>Created at {formatDate(new Date(created_at))}</p>
        <p>Updated at {formatDate(new Date(updated_at))}</p>
        <ErrorMessage>{error}</ErrorMessage>
      </article>
    );
  }
}
