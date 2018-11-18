import * as React from 'react';
import { css } from 'react-emotion';
import { spacing } from './styles';
import formatDate from './date-formatter';
import Label from './label';
import Button from './button';
import Textarea from './textarea';
import ErrorMessage from './error-message';

export default class RantUpdate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rantUpdate: this.props.rantUpdate,
      editing: false,
      saving: false,
      justSaved: false,
      error: null,
    };
  }

  render() {
    const { rant, onDelete } = this.props;
    const { rantUpdate, editing, saving, error } = this.state;

    return (
      <article
        id={`rant-update-${rantUpdate.id}`}
        className={css`
          border: solid hotpink 1px;
          padding: ${spacing.tiny};
        `}
      >
        {editing ? (
          <form
            onSubmit={async e => {
              e.preventDefault();

              this.setState({ saving: true });

              const response = await fetch(
                `/rants/${rant.id}/updates/${rantUpdate.id}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(rantUpdate),
                },
              );

              const savedRantUpdate = await response.json();

              this.setState({
                rantUpdate: savedRantUpdate,
                editing: false,
                saving: false,
              });
            }}
          >
            <Label text="Update">
              <Textarea
                value={rantUpdate.body}
                disabled={saving}
                onChange={e => {
                  this.setState({
                    rantUpdate: {
                      ...rantUpdate,
                      body: e.target.value,
                    },
                  });
                }}
              />
            </Label>
            <Button disabled={saving}>Save</Button>
          </form>
        ) : (
          <React.Fragment>
            <p>{rantUpdate.body}</p>
            <Button
              type="button"
              onClick={() => {
                this.setState({ editing: true });
              }}
            >
              Edit
            </Button>
          </React.Fragment>
        )}
        <Button
          type="button"
          onClick={async () => {
            if (
              window.confirm(
                `Are you sure you want to delete this update? "${
                  rantUpdate.body
                }"`,
              )
            ) {
              const response = await fetch(
                `/rants/${rant.id}/updates/${rantUpdate.id}`,
                {
                  method: 'DELETE',
                },
              );

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
        <p>
          <a href={`#rant-update-${rantUpdate.id}`}>
            Created {formatDate(rantUpdate.created_at)}
          </a>
        </p>
        <p>Updated {formatDate(rantUpdate.updated_at)}</p>
        <ErrorMessage>{error}</ErrorMessage>
      </article>
    );
  }
}
