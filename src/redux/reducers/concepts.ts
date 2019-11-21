import { ConceptsActions } from '../actions/actionTypes'
import Concept from '../../models/Concept'

interface IConceptsInitialState {
  concepts: Concept[]
}

let initialState:IConceptsInitialState = {
  concepts: []
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case ConceptsActions.SET_CONCEPTS: {
      return {
        ...state,
        concepts: action.data.content
      }
    }
    default: 
      return state
  }
}
