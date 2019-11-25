import { ProblemsActions } from '../actions/actionTypes'
import Problem from '../../models/Problem'

interface IProblemsInitialState {
  problems: Problem[]
  currentProblem: Problem
  currentPage: number
  loadingProblems: boolean
  totalItems: number
  itemsPerPage: number
  totalPages: number
}

let initialState:IProblemsInitialState = {
  problems: [],
  currentProblem: {} as Problem,
  currentPage: 1,
  loadingProblems: true,
  totalItems: 0,
  itemsPerPage: 0,
  totalPages: 0
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case ProblemsActions.LOADING_PROBLEMS: {
      return {
        ...state,
        loadingProblems: true
      }
    }
    case ProblemsActions.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case ProblemsActions.SET_PROBLEMS: {
      return {
        ...state,
        problems: action.data.content,
        loadingProblems: false,
        totalItems: action.data.totalElements,
        itemsPerPage: action.data.size,
        totalPages: action.data.totalPages,
        currentPage: action.data.totalPages < state.currentPage
              ? action.data.totalPages
              : state.currentPage
      }
    }
    case ProblemsActions.SET_CURRENT_PROBLEM: {
      return {
        ...state,
        currentProblem: action.data
      }
    }
    default: 
      return state
  }
}
