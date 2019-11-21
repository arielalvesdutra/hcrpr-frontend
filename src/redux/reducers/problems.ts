import { ProblemsActions } from '../actions/actionTypes'
import Problem from '../../models/Problem'

interface IProblemsInitialState {
  problems: Problem[]
}

let initialState:IProblemsInitialState = {
  problems: []
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case ProblemsActions.SET_PROBLEMS: {
      return {
        ...state,
        problems: action.data.content
      }
    }
    default: 
      return state
  }
}
