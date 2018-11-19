// @flow

import * as React from 'react';
import Button from './button';
import Label from './label';
import Textarea from './textarea';
import type {Rant as  IRant, RantUpdate as IRantUpdate } from './types';

interface Props {
  rant: IRant;
  onSubmit: (IRantUpdate) => void;
}

interface State {
  body: string;
  saving: boolean;
}

export default class RantUpdateForm extends React.PureComponent<Props, State> {
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

          const rantUpdate: IRantUpdate  = await response.json();

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
