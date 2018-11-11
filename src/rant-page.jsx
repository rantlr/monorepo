import * as React from 'react';
import formatDate from './date-formatter';
import RantUpdateForm from './rant-update-form';
import Label from './label';
import Button from './button';
import Textarea from './textarea';

const Post = ({ title, background, created }) => (
  <article style={{ border: 'solid black 1px', padding: 2 }}>
    <h1>{title}</h1>
    <p>{background}</p>
    <p>Created at {formatDate(new Date(created))}</p>
  </article>
);

class RantUpdate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rantUpdate: this.props.rantUpdate,
      editing: false,
      saving: false,
      justSaved: false,
    };
  }

  render() {
    const { rant } = this.props;
    const { rantUpdate, editing, saving } = this.state;

    return (
      <article style={{ border: 'solid hotpink 1px', padding: 2 }}>
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
                  console.log(e.target.value);
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
        <p>Created {formatDate(new Date(rantUpdate.created))}</p>
        <p>Updated {formatDate(new Date(rantUpdate.updated))}</p>
      </article>
    );
  }
}

export default class RantPage extends React.PureComponent {
  state = {
    rant: null,
  };

  async componentDidMount() {
    const response = await fetch(`/rants/${this.props.id}`);
    const rant = await response.json();

    this.setState({ rant });
  }

  render() {
    const { rant } = this.state;

    if (rant == null) {
      return 'Loading…';
    }

    const { updates } = rant;

    return (
      <React.Fragment>
        <section>
          <Post {...rant} />
          {updates.map(update => (
            <RantUpdate key={update.id} rantUpdate={update} rant={rant} />
          ))}
        </section>
        <section id="rant-update-form">
          <RantUpdateForm
            rant={rant}
            onSubmit={rantUpdate => {
              this.setState({
                rant: { ...rant, updates: [...rant.updates, rantUpdate] },
              });
            }}
          />
        </section>
      </React.Fragment>
    );
  }
}
