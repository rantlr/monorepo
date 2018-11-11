import * as React from 'react';
import { Link } from '@reach/router';
import formatDate from './date-formatter';

export default ({ id, title, background, created, updated }) => (
  <article id={encodeURIComponent(title)}>
    <Link to={`/rant/${id}`}>
      <h1>{title}</h1>
    </Link>
    <p>{background}</p>
    <p>Created at {formatDate(new Date(created))}</p>
    <p>Updated at {formatDate(new Date(updated))}</p>
  </article>
);
