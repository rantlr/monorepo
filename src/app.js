import React from 'react';
import './app.css';
import { Router } from '@reach/router';
import Homepage from './homepage';
import RantPage from './rant-page';

export default () => (
  <div className="App">
    <header className="App-header">
      <h1>Rantlr</h1>
    </header>
    <Router>
      <Homepage path="/" />
      <RantPage path="/rant/:id" />
    </Router>
  </div>
);
