import * as React from 'react';
import RantSummary from './rant-summary';

const RantList = ({ rants }) => (
  <ul>
    {rants.map(rant => (
      <li key={rant.id}>
        <RantSummary {...rant} />
      </li>
    ))}
  </ul>
);

export default RantList;
