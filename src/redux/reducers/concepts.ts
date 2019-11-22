import { ConceptsActions } from '../actions/actionTypes'
import Concept from '../../models/Concept'

export interface IConceptsInitialState {
  concepts: Concept[]
  currentConcept: Concept,
  loadingConcepts: boolean
}

let initialState:IConceptsInitialState = {
  concepts: [],
  currentConcept: {} as Concept,
  loadingConcepts: false
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case ConceptsActions.LOADING_CONCEPTS: {
      return {
        ...state,
        loadingConcepts: true
      }
    }
    case ConceptsActions.SET_CONCEPTS: {
      return {
        ...state,
        concepts: action.data.content,
        loadingConcepts: false
      }
    }
    case ConceptsActions.SET_CURRENT_CONCEPT: {
      return {
        ...state,
        currentConcept: action.data
      }
    }
    default: 
      return state
  }
}
