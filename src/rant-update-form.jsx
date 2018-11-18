import * as React from 'react';
import Button from './button';
import Label from './label';
import Textarea from './textarea';

export default class RantUpdateForm extends React.PureComponent {
  state = {
    body: '',
    saving: false,
  };

  render() {
    const { rant, onSubmit } = this.props;
    const { saving } = this.state;

    return (
      <form
        onSubmit={async e => {
          e.preventDefault();

          const data = { body: this.state.body };

          this.setState({ saving: true });

          const response = await fetch(`/rants/${rant.id}/updates`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const rantUpdate = await response.json();

          onSubmit(rantUpdate);

          this.setState({
            body: '',
            saving: false,
          });
        }}
      >
        <Label text="Rant update">
          <Textarea
            value={this.state.body}
            rows={5}
            onChange={e => this.setState({ body: e.target.value })}
            disabled={saving}
          />
        </Label>
        <Button disabled={saving}>Post update</Button>
      </form>
    );
  }
}
