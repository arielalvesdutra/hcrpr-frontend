import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Problems from './modules/problem/problems'
import ProblemById from './modules/problem/problem-by-id'
import Concepts from './modules/concept/concepts'
import Techniques from './modules/technique/techniques'
import TechniqueById from './modules/technique/technique-by-id'
import ConceptById from './modules/concept/concept-by-id';

import SolutionAttemptById from './modules/solution-attempt/solution-attempt-by-id'

const Routes = () => 
  <div className="view-routes">
    <Switch>
      <Route exact path="/techniques" component={Techniques}/>
      <Route path="/techniques/:id" component={TechniqueById}/>
      <Route exact path="/concepts" component={Concepts} />
      <Route path="/concepts/:id" component={ConceptById} />
      <Route exact path="/problems" component={Problems}/>
      <Route exact path="/problems/:id" component={ProblemById}/>
      <Route path="/problems/:id/solution-attempts/:solutionAttemptId" 
            component={SolutionAttemptById}/>
      <Route exact path="/" component={Problems}/>
    </Switch>
  </div>

export default Routes
