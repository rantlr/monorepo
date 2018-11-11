import * as React from 'react';
import Textarea from './textarea';
import Label from './label';
import Button from './button';

export default class RantUpdateForm extends React.PureComponent {
  state = {
    body: '',
  };

  render() {
    const { rant, onSubmit } = this.props;
    return (
      <form
        onSubmit={async e => {
          e.preventDefault();

          const data = { body: this.state.body };

          const response = await fetch(`/rants/${rant.id}/updates`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          const rantUpdate = await response.json();
          onSubmit(rantUpdate);
        }}
      >
        <Label text="Rant update">
          <Textarea
            rows={5}
            onChange={e => this.setState({ body: e.target.value })}
          />
        </Label>
        <Button>Post update</Button>
      </form>
    );
  }
}
