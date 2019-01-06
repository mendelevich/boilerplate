import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

const Main = () => (
  <div>
    <nav>{/* <Link to="/" id="">TEXT</Link> */}</nav>
    <p>Hello World</p>
    <main>
      <Switch>
        {/* <Route exact path="/" component={} /> */}
        {/* <Route path="/" component={} /> */}
      </Switch>
    </main>
  </div>
);

export default Main;
