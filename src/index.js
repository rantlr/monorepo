// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(<App />, root);
} else {
  throw new Error("Can't render root");
}
