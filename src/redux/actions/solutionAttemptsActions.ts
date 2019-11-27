import { SolutionAttemptsActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'
import SolutionAttemptComment from '../../models/SolutionAttemptComment'
import { fetchSolutionAttemptById } from './problemsActions'


export const createSolutionAttemptComment = (
    problemId: number, solutionAttemptId:number, comment: SolutionAttemptComment) => {

  return (dispatch:any, getState:any) => {
    axios.post(`/problems/${problemId}/solution-attempts/${solutionAttemptId}/comments`, {
      content: comment.content
    })
    .then(response => {

      const page = getCommentsCurrentPageAfterCreateComment(getState().solutionAttempts)
    
      dispatch(fetchAllSolutionAttemptComments(problemId, solutionAttemptId, {page}))

    }).catch(error =>  error)
  }
}

export const deleteSolutionAttemptComment = (problemId: number, attemptId:number, commentId:number) => {
  return (dispatch:any, getState:any) => {

    axios.delete(`/problems/${problemId}/solution-attempts/${attemptId}/comments/${commentId}`)
    .then(response => {

      const page = getCommentsCurrentPageAfterDeleteComment(getState().solutionAttempts)
            
      dispatch(fetchAllSolutionAttemptComments(problemId, attemptId, {page}))
    })
  }
}

export const fetchAllSolutionAttemptComments = (
    problemId: number, solutionAttemptId:number, filters:any = {}) => {
  
  return (dispatch:any) => {

    if (filters.sort === undefined) filters.sort = 'createdAt,desc'    
    const queryString = buildQueryString(filters)

    axios.get(`/problems/${problemId}/solution-attempts/${solutionAttemptId}/comments${queryString}`)
    .then(response => {

      const data = response.data
      dispatch(setCurrentSolutionAttemptComments(data))
    })
    .catch(error => error)
  }
}

export const updateSolutionAttempTechniques = (problemId:number, attemptId:number, techniquesIds:number[]) => {
  return (dispatch:any) => {

    axios.put(`/problems/${problemId}/solution-attempts/${attemptId}/techniques`, {
      techniquesIds: techniquesIds
    })
    .then(response => {
      dispatch(fetchSolutionAttemptById(problemId, attemptId))
    })
  }
}


export const setCurrentSolutionAttemptComments = (data:any) => {
  return {
    type: SolutionAttemptsActions.SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS,
    data
  }
}

export const setCurrentSolutionAttemptCommentsPage = (page:number) => {
  return {
    type: SolutionAttemptsActions.SET_CURRENT_SOLUTION_ATTEMPT_COMMENTS_PAGE,
    currentPage: page
  }
}


const getCommentsCurrentPageAfterDeleteComment = (solutionAttemptReducer: any) => {
  const { 
    currentSolutionAttemptCommentsPage, 
    currentSolutionAttemptCommentsTotalItems, 
    currentSolutionAttemptCommentsItemsPerPage } = solutionAttemptReducer

  return calcCurrentPage(
      currentSolutionAttemptCommentsPage,
      (currentSolutionAttemptCommentsTotalItems -1),
      currentSolutionAttemptCommentsItemsPerPage)
}

const getCommentsCurrentPageAfterCreateComment = (solutionAttemptReducer: any) => {
  const { 
    currentSolutionAttemptCommentsPage, 
    currentSolutionAttemptCommentsTotalItems, 
    currentSolutionAttemptCommentsItemsPerPage } = solutionAttemptReducer

  return calcCurrentPage(
      currentSolutionAttemptCommentsPage,
      (currentSolutionAttemptCommentsTotalItems +1),
      currentSolutionAttemptCommentsItemsPerPage)
}

const calcCurrentPage = (actualPage:number, totalItems:number, itemsPerPage:number):number => {

  const maxOfPages = Math.ceil(totalItems / itemsPerPage)
  const calculatedPage = (maxOfPages < actualPage)
      ? maxOfPages
      : actualPage

  return calculatedPage
}
