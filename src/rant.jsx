import * as React from 'react';
import formatDate from './date-formatter';

export default ({ title, background, created }) => (
  <article id={encodeURIComponent(title)}>
    <h1>{title}</h1>
    <p>{background}</p>
    <p>Created at {formatDate(new Date(created))}</p>
  </article>
);
