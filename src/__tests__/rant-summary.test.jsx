import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import RantSummary from '../rant-summary';

const createdAt = '2018-11-17T15:19:52.675Z';
const updatedAt = '2018-12-23T10:11:12.131Z';

afterEach(cleanup);

test('snapshot', () => {
  render(
    <RantSummary
      id="1234"
      title="Some title"
      background="Some background"
      created_at={createdAt}
      updated_at={updatedAt}
    />,
  );

  expect(document.documentElement).toMatchSnapshot();
});
