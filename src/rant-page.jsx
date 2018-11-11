import * as React from 'react';
import formatDate from './date-formatter';
import RantUpdateForm from './rant-update-form';

const Post = ({ title, background, created }) => (
  <article style={{ border: 'solid black 1px', padding: 2 }}>
    <h1>{title}</h1>
    <p>{background}</p>
    <p>Created at {formatDate(new Date(created))}</p>
  </article>
);

const Update = ({ body, created }) => (
  <article style={{ border: 'solid hotpink 1px', padding: 2 }}>
    <p>{body}</p>
    <p>{formatDate(new Date(created))}</p>
  </article>
);

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
            <Update key={update.id} {...update} />
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
