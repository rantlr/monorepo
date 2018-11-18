import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import RantUpdate from '../rant-update';

const createdAt = '2018-11-17T15:19:52.675Z';
const updatedAt = '2018-12-23T10:11:12.131Z';

afterEach(cleanup);

test('snapshot', () => {
  const rant = {
    id: '123',
  };

  const rantUpdate = {
    id: '1234',
    body: 'some body',
    created_at: createdAt,
    updated_at: updatedAt,
  };

  render(
    <RantUpdate rant={rant} rantUpdate={rantUpdate} onDelete={jest.fn()} />,
  );

  expect(document.documentElement).toMatchSnapshot();
});
