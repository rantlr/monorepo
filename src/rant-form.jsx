import * as React from 'react';
import Input from './input';
import Textarea from './textarea';
import Label from './label';
import Button from './button';

export default class RantForm extends React.PureComponent {
  state = {
    title: '',
    background: '',
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit(this.state);

          // Clear the fields
          this.setState({
            title: '',
            background: '',
          });
        }}
      >
        <Label>
          Title
          <Input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </Label>
        <Label>
          Background
          <Textarea
            value={this.state.background}
            onChange={e => this.setState({ background: e.target.value })}
          />
        </Label>
        <Button>Publish rant</Button>
      </form>
    );
  }
}
