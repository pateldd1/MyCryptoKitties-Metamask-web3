import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Kitty from './components/Kitty';
import Transaction from './components/Transaction';
import history from './history';

export default () => {
  return (
      <Router history={history}>
        <div>
          <Route
            path="/"
            render={(props) => <App {...props} />} />
          <Route
            path="/kitties"
            render={(props) => <Kitty {...props} />} />
          <Route
            path="/transactions"
            render={(props) => <Transaction {...props} />} />
        </div>
      </Router>
  );
}
