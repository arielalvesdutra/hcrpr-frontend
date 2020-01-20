import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import Problems from './modules/problem/problems'
import ProblemById from './modules/problem/problem-by-id'
import Concepts from './modules/concept/concepts'
import Techniques from './modules/technique/techniques'
import TechniqueById from './modules/technique/technique-by-id'
import ConceptById from './modules/concept/concept-by-id';
import SolutionAttemptById from './modules/solution-attempt/solution-attempt-by-id'
import Error404 from './modules/errors/Error404';
import ServiceUnavailable from './modules/errors/ServiceUnavailable';
import Error400 from './modules/errors/Error400';
import { IErrorsInitialState } from './redux/reducers/errorsReducers';
import { clearPageErrors } from './redux/actions/errorsActions';
import { ErrorConsts } from './redux/reducers/errorsReducers'

interface IRoutesProps {
  onClearPageErrors(): any
  pageError: string
}

const Routes = (props: IRoutesProps) => { 
  const { pageError, onClearPageErrors } = props
  const location = useLocation()

  useEffect(() => {
    onClearPageErrors()
  }, [ location.pathname, onClearPageErrors ])

  if (pageError === ErrorConsts.ERROR_404 ) {
    return <div className="view-routes"><Error404 /></div>
  }

  if (pageError === ErrorConsts.ERROR_400) {
    return <div className="view-routes"><Error400 /></div>
  }

  if (pageError === ErrorConsts.SERVICE_UNAVAILABLE) {
    return <div className="view-routes"><ServiceUnavailable /></div>
  }
  
  return (
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
        <Route path="*" component={Error404}/>
      </Switch>
    </div>
  )
}

const mapStateToProps = (props: any) => {
  const { pageError }: IErrorsInitialState = props.errors
  return { pageError }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClearPageErrors: () => dispatch(clearPageErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
