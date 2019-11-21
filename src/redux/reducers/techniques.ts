import { TechniquesActions } from '../actions/actionTypes'
import Technique from '../../models/Technique'

interface ITechniquesInitialState {
  techniques: Technique[]
}

let initialState:ITechniquesInitialState = {
  techniques: []
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case TechniquesActions.SET_TECHNIQUES: {
      return {
        ...state,
        techniques: action.data.content
      }
    }
    default: 
      return state
  }
}
