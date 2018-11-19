// @flow

import * as React from 'react';
import Button from './button';
import Input from './input';
import Label from './label';
import Textarea from './textarea';

interface State {
  title: string;
  background: string;
}

interface Props {
  onSubmit: State => void;
}

export default class RantForm extends React.PureComponent<Props, State> {
  state = {
    title: '',
    background: '',
  };

  render() {
    return (
      <form
        onSubmit={(e: SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          this.props.onSubmit(this.state);

          // Clear the fields
          this.setState({
            title: '',
            background: '',
          });
        }}
      >
        <Label text="Title">
          <Input
            morrado={1}
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </Label>
        <Label text="Background">
          <Textarea
            value={this.state.background}
            onChange={e => this.setState({ background: e.target.value })}
          />
        </Label>
        <Button> Publish rant</Button>
      </form>
    );
  }
}
