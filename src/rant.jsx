import * as React from 'react';
import formatDate from './date-formatter';
import Button from './button';
import ErrorMessage from './error-message';

export default class Rant extends React.PureComponent {
  state = {
    error: null,
  };

  render() {
    const { id, title, background, created, updated, onDelete } = this.props;

    const { error } = this.state;

    return (
      <article style={{ border: 'solid black 1px', padding: 2 }}>
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
        <p>Created at {formatDate(new Date(created))}</p>
        <p>Updated at {formatDate(new Date(updated))}</p>
        <ErrorMessage>{error}</ErrorMessage>
      </article>
    );
  }
}
