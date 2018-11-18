import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import Rant from '../rant';

const createdAt = '2018-11-17T15:19:52.675Z';
const updatedAt = '2018-12-23T10:11:12.131Z';

afterEach(cleanup);

test('snapshot', () => {
  render(
    <Rant
      id="12"
      title="Some title"
      background="Some background"
      created_at={createdAt}
      updated_at={updatedAt}
      onDelete={jest.fn()}
    />,
  );

  expect(document.documentElement).toMatchSnapshot();
});
