import { ConceptsActions } from '../actions/actionTypes'
import Concept from '../../models/Concept'

export interface IConceptsInitialState {
  concepts: Concept[]
  currentConcept: Concept
  currentPage: number
  loadingConcepts: boolean
  totalItems: number
  itemsPerPage: number
  totalPages: number
}

let initialState:IConceptsInitialState = {
  concepts: [],
  currentConcept: {} as Concept,
  currentPage: 1,
  loadingConcepts: true,
  totalItems: 0,
  itemsPerPage: 0,
  totalPages: 0
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
        loadingConcepts: false,
        totalItems: action.data.totalElements,
        itemsPerPage: action.data.size,
        totalPages: action.data.totalPages,
        currentPage: action.data.totalPages < state.currentPage
              ? action.data.totalPages
              : state.currentPage
      }
    }
    case ConceptsActions.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
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
