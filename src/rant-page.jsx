// @flow

import * as React from 'react';
import Rant from './rant';
import RantUpdate from './rant-update';
import RantUpdateForm from './rant-update-form';
import { Rant as IRant } from './types';
import type { RouteProps } from '@reach/router';

type Props = RouteProps;

interface State {
  rant?: IRant;
}

export default class RantPage extends React.PureComponent<Props, State> {
  state = {};

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
          <Rant
            {...rant}
            onDelete={() => {
              this.props.navigate('/');
            }}
          />
          {updates.map((update, index) => (
            <RantUpdate
              key={update.id}
              rantUpdate={update}
              rant={rant}
              onDelete={() => {
                this.setState({
                  rant: {
                    ...rant,
                    updates: [
                      ...updates.slice(0, index),
                      ...updates.slice(index + 1, updates.length),
                    ],
                  },
                });
              }}
            />
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
