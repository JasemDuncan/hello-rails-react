import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import HelloWorld from './HelloWorld';

import configureStore from '../configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => ('Home!!!!!')} />
        <Route path="/hello" render={() => <HelloWorld greeting="Friendsssss" />} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
