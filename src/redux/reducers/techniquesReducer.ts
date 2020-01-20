import { TechniquesActions } from '../actions/actionTypes'
import Technique from '../../models/Technique'

export interface ITechniquesInitialState {
  techniques: Technique[]
  currentTechnique: Technique
  currentPage: number,
  isLoadingTechniques: boolean,
  isLoadingCurrentTechnique: boolean,
  totalItems: number,
  itemsPerPage: number,
  totalPages: number
}

let initialState:ITechniquesInitialState = {
  techniques: [],
  currentTechnique: {} as Technique,
  currentPage: 1,
  isLoadingTechniques: true,
  isLoadingCurrentTechnique: true,
  totalItems: 0,
  itemsPerPage: 0,
  totalPages: 0
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case TechniquesActions.SET_IS_LOADING_TECHNIQUES: {
      return {
        ...state,
        isLoadingTechniques: action.isLoading
      }
    }

    case TechniquesActions.SET_IS_LOADING_CURRENT_TECHNIQUE: {
      return {
        ...state,
        isLoadingCurrentTechnique: action.isLoading
      }
    }
    case TechniquesActions.SET_TECHNIQUES: {
      return {
        ...state,
        techniques: action.data.content,
        isLoadingTechniques: false,
        totalItems: action.data.totalElements,
        itemsPerPage: action.data.size,
        totalPages: action.data.totalPages,
        currentPage: action.data.totalPages < state.currentPage
              ? action.data.totalPages
              : state.currentPage
      }
    }
    case TechniquesActions.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case TechniquesActions.SET_CURRENT_TECHNIQUE: {
      return {
        ...state,
        currentTechnique: action.data,
      }
    }
    default: 
      return state
  }
}
