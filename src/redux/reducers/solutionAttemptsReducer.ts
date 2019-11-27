import { SolutionAttemptsActions } from '../actions/actionTypes'
import SolutionAttemptComment from '../../models/SolutionAttemptComment'

interface IProblemsInitialState {
  currentSolutionAttemptComments: SolutionAttemptComment[]
  currentSolutionAttemptCommentsPage: number
  currentSolutionAttemptCommentsTotalItems: number
  currentSolutionAttemptCommentsTotalPages: number
  currentSolutionAttemptCommentsItemsPerPage: number
}

let initialState:IProblemsInitialState = {
  currentSolutionAttemptComments: [] as SolutionAttemptComment[],
  currentSolutionAttemptCommentsPage: 1,
  currentSolutionAttemptCommentsTotalItems: 0,
  currentSolutionAttemptCommentsTotalPages: 0,
  currentSolutionAttemptCommentsItemsPerPage: 0
}

export default (state: IProblemsInitialState = initialState, action:any) => {
  switch(action.type) {

    case SolutionAttemptsActions.SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS: {      
      return {
        ...state,
        currentSolutionAttemptComments: action.data.content,
        currentSolutionAttemptCommentsTotalItems: action.data.totalElements,
        currentSolutionAttemptCommentsItemsPerPage: action.data.size,
        currentSolutionAttemptCommentsTotalPages: action.data.totalPages,
        currentSolutionAttemptCommentsPage: action.data.totalPages < state.currentSolutionAttemptCommentsPage
              ? action.data.totalPages
              : state.currentSolutionAttemptCommentsPage
      }
    }
    case SolutionAttemptsActions.SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS_PAGE: {
      return {
        ...state,
        currentSolutionAttemptCommentsPage: action.currentPage
      }
    }
    default: 
      return state
  }
}
