import * as React from 'react';
import Rant from './rant';

export default ({ rants }) => (
  <ul>
    {rants.map(rant => (
      <li key={rant.id}>
        <Rant {...rant} />
      </li>
    ))}
  </ul>
);
