import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Catalog from './containers/Catalog';

const App = () => (
  <div>
    <h1>Catalog</h1>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/catalog" component={Catalog} />
    </Switch>
  </div>
);

export default App;
