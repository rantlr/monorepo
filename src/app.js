// @flow

import { Link, Router } from '@reach/router';
import React from 'react';
import './app.css';
import Homepage from './homepage';
import RantPage from './rant-page';

const App = () => (
  <div className="App">
    <header className="App-header">
      <Link to="/">
        <h1>Rantlr</h1>
      </Link>
    </header>
    <Router>
      <Homepage path="/" />
      <RantPage path="/rant/:id" />
    </Router>
  </div>
);

export default App;
