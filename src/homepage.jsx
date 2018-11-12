import * as React from 'react';
import RantForm from './rant-form';
import RantList from './rant-list';

export default class Homepage extends React.PureComponent {
  state = {
    loading: true,
    rants: [],
  };

  async componentDidMount() {
    const response = await fetch('/rants');
    const rants = await response.json();
    this.setState({ rants, loading: false });
  }

  render() {
    return (
      <React.Fragment>
        <section id="new-rant">
          <h1>New rant</h1>
          <RantForm
            onSubmit={async data => {
              const response = await fetch('/rants', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              const rant = await response.json();

              this.props.navigate(`/rant/${rant.id}`);
            }}
          />
        </section>
        <section id="rants">
          <h1>Latest rants</h1>
          {/* TODO: Sort by new, popular, whatever */}
          {this.state.loading ? (
            'Loading rants…'
          ) : (
            <RantList rants={this.state.rants} />
          )}
        </section>
      </React.Fragment>
    );
  }
}
