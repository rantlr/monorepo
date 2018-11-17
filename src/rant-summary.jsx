import * as React from 'react';
import { Link } from '@reach/router';
import formatDate from './date-formatter';

const RantSummary = ({ id, title, background, created_at, updated_at }) => (
  <article id={encodeURIComponent(title)}>
    <Link to={`/rant/${id}`}>
      <h1>{title}</h1>
    </Link>
    <p>{background}</p>
    <p>Created at {formatDate(new Date(created_at))}</p>
    <p>Updated at {formatDate(new Date(updated_at))}</p>
  </article>
);

export default RantSummary;
