import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Problems from './modules/problem/problems'
import Concepts from './modules/concept/concepts'
import Techniques from './modules/technique/techniques'

const Routes = () => 
  <div className="view-routes">
    <Switch>
      <Route path="/techniques" component={Techniques}/>
      <Route path="/concepts" component={Concepts} />
      <Route path="/problems" component={Problems}/>
      <Route exact path="/" component={Problems}/>
    </Switch>
  </div>

export default Routes
