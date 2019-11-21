import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk';

import conceptsReducer from './reducers/concepts'
import tehcniquesReducer from './reducers/techniques'
import problemsReducer from './reducers/problems'

// export default createStore(conceptsReducer, applyMiddleware(thunk))

const reducers = combineReducers({
  concepts: conceptsReducer,
  techniques: tehcniquesReducer,
  problems: problemsReducer
})

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
