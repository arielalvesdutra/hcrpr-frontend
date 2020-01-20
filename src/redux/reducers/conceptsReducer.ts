import { ConceptsActions } from '../actions/actionTypes'
import Concept from '../../models/Concept'

export interface IConceptsInitialState {
  concepts: Concept[]
  currentConcept: Concept
  currentPage: number
  isLoadingConcepts: boolean
  isLoadingCurrentConcept: boolean
  totalItems: number
  itemsPerPage: number
  totalPages: number
}

let initialState:IConceptsInitialState = {
  concepts: [],
  currentConcept: {} as Concept,
  currentPage: 1,
  isLoadingConcepts: true,
  isLoadingCurrentConcept: true,
  totalItems: 0,
  itemsPerPage: 0,
  totalPages: 0
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case ConceptsActions.SET_IS_LOADING_CONCEPTS: {
      return {
        ...state,
        isLoadingConcepts: action.isLoading
      }
    }
    case ConceptsActions.SET_IS_LOADING_CURRENT_CONCEPT: {
      return {
        ...state,
        isLoadingCurrentConcept: action.isLoading
      }
    }
    case ConceptsActions.SET_CONCEPTS: {
      return {
        ...state,
        concepts: action.data.content,
        isLoadingConcepts: false,
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
