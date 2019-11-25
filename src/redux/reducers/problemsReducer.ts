import { ProblemsActions } from '../actions/actionTypes'
import Problem from '../../models/Problem'
import ProblemComment from '../../models/ProblemComment'

interface IProblemsInitialState {
  problems: Problem[]
  currentProblem: Problem
  currentPage: number
  currentProblemCommentsPage: number
  loadingProblems: boolean
  totalItems: number
  itemsPerPage: number
  totalPages: number
  currentProblemComments: ProblemComment[]
  currentProblemCommentsTotalItems: number
  currentProblemCommentsTotalPages: number
  currentProblemCommentsItemsPerPage: number
}

let initialState:IProblemsInitialState = {
  problems: [],
  currentProblem: {} as Problem,
  currentPage: 1,
  currentProblemCommentsPage: 1,
  loadingProblems: true,
  totalItems: 0,
  itemsPerPage: 0,
  totalPages: 0,
  currentProblemComments: {} as ProblemComment[],
  currentProblemCommentsTotalItems: 0,
  currentProblemCommentsTotalPages: 0,
  currentProblemCommentsItemsPerPage: 0
}

export default (state: IProblemsInitialState = initialState, action:any) => {
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
    case ProblemsActions.SET_CURRENT_PROBLEM_COMMENTS: {      
      return {
        ...state,
        currentProblemComments: action.data.content,
        currentProblemCommentsTotalItems: action.data.totalElements,
        currentProblemCommentsItemsPerPage: action.data.size,
        currentProblemCommentsTotalPages: action.data.totalPages,
        currentProblemCommentsPage: action.data.totalPages < state.currentProblemCommentsPage
              ? action.data.totalPages
              : state.currentProblemCommentsPage
      }
    }
    case ProblemsActions.SET_CURRENT_PROBLEM_COMMENTS_PAGE: {
      return {
        ...state,
        currentProblemCommentsPage: action.currentPage
      }
    }
    default: 
      return state
  }
}
