// @flow

import { Link } from '@reach/router';
import * as React from 'react';
import formatDate from './date-formatter';
import type { Rant } from './types';

const RantSummary = ({
  id,
  title,
  background,
  created_at,
  updated_at,
}: Rant) => (
  <article id={encodeURIComponent(title)}>
    <Link to={`/rant/${id}`}>
      <h1>{title}</h1>
    </Link>
    <p>{background}</p>
    <p>Created at {formatDate(created_at)}</p>
    <p>Updated at {formatDate(updated_at)}</p>
  </article>
);

export default RantSummary;
