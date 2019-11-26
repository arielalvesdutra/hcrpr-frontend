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

const reducers = combineReducers({
  concepts: conceptsReducer,
  techniques: tehcniquesReducer,
  problems: problemsReducer
})

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
