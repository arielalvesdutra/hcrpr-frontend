import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Problems from './modules/problem/problems'
import Concepts from './modules/concept/concepts'
import Techniques from './modules/technique/techniques'
import TechniqueById from './modules/technique/technique-by-id'
import ConceptById from './modules/concept/concept-by-id';

const Routes = () => 
  <div className="view-routes">
    <Switch>
      <Route exact path="/techniques" component={Techniques}/>
      <Route path="/techniques/:id" component={TechniqueById}/>
      <Route exact path="/concepts" component={Concepts} />
      <Route path="/concepts/:id" component={ConceptById} />
      <Route path="/problems" component={Problems}/>
      <Route exact path="/" component={Problems}/>
    </Switch>
  </div>

export default Routes
