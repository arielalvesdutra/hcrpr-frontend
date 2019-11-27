import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk';

import conceptsReducer from './reducers/conceptsReducer'
import tehcniquesReducer from './reducers/techniquesReducer'
import problemsReducer from './reducers/problemsReducer'
import solutionAttemptsReducer from './reducers/solutionAttemptsReducer'

const reducers = combineReducers({
  concepts: conceptsReducer,
  techniques: tehcniquesReducer,
  problems: problemsReducer,
  solutionAttempts: solutionAttemptsReducer
})

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
