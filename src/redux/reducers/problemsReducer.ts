import { ProblemsActions } from '../actions/actionTypes'
import Problem from '../../models/Problem'
import ProblemComment from '../../models/ProblemComment'
import SolutionAttempt from '../../models/SolutionAttempt'

interface IProblemsInitialState {
  problems: Problem[]
  currentProblem: Problem
  currentPage: number
  loadingProblems: boolean
  totalItems: number
  itemsPerPage: number
  totalPages: number
  currentProblemComments: ProblemComment[]
  currentProblemCommentsPage: number
  currentProblemCommentsTotalItems: number
  currentProblemCommentsTotalPages: number
  currentProblemCommentsItemsPerPage: number
  currentProblemSolutionAttempt: SolutionAttempt
  currentProblemSolutionAttempts: SolutionAttempt[]
  currentProblemSolutionAttemptsPage: number
  currentProblemSolutionAttemptsTotalItems: number
  currentProblemSolutionAttemptsTotalPages: number
  currentProblemSolutionAttemptsItemsPerPage: number
}

let initialState:IProblemsInitialState = {
  problems: [] as Problem[],
  currentProblem: {} as Problem,
  currentPage: 1,
  loadingProblems: true,
  totalItems: 0,
  itemsPerPage: 0,
  totalPages: 0,
  currentProblemComments: {} as ProblemComment[],
  currentProblemCommentsPage: 1,
  currentProblemCommentsTotalItems: 0,
  currentProblemCommentsTotalPages: 0,
  currentProblemCommentsItemsPerPage: 0,
  currentProblemSolutionAttempt: {} as SolutionAttempt,
  currentProblemSolutionAttempts: {} as SolutionAttempt[],
  currentProblemSolutionAttemptsPage: 1,
  currentProblemSolutionAttemptsTotalItems: 0,
  currentProblemSolutionAttemptsTotalPages: 0,
  currentProblemSolutionAttemptsItemsPerPage: 0,
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
    case ProblemsActions.SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS: {      
      return {
        ...state,
        currentProblemSolutionAttempts: action.data.content,
        currentProblemSolutionAttemptsTotalItems: action.data.totalElements,
        currentProblemSolutionAttemptsItemsPerPage: action.data.size,
        currentProblemSolutionAttemptsTotalPages: action.data.totalPages,
        currentProblemSolutionAttemptsPage: action.data.totalPages < state.currentProblemSolutionAttemptsPage
              ? action.data.totalPages
              : state.currentProblemSolutionAttemptsPage
        
      }
    }
    case ProblemsActions.SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS_PAGE: {
      return {
        ...state,
        currentProblemSolutionAttemptsPage: action.currentPage
      }
    }
    case ProblemsActions.SET_CURRENT_PROBLEM_SOLUTION_ATTEMPT: {
      return {
        ...state,
        currentProblemSolutionAttempt: action.data
      }
    }
    default: 
      return state
  }
}
