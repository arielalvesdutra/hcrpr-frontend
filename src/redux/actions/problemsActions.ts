import { ProblemsActions } from './actionTypes'
import { IProblemsInitialState } from '../reducers/problemsReducer'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'

import Problem from '../../models/Problem'
import ProblemComment from '../../models/ProblemComment'
import SolutionAttempt from '../../models/SolutionAttempt'


export const createProblem = (problem:Problem) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.post('/problems', {
      name: problem.name,
      description: problem.description
    })
    .then(response => {

      const page = getCurrentPageAfterCreate(getState().problems)

      dispatch(fetchAllProblems({ page }))
    })
  }
}

export const createProblemComment = (problemId:number, comment:ProblemComment) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.post(`/problems/${problemId}/comments`, {
      content: comment.content
    })
    .then(response => {

      const page = getCurrentCommentPageAfterCreateComment(getState().problems)
      
      dispatch(fetchAllProblemComments(problemId, {page}))
    })
  }
}

export const createSolutionAttempt = (problemId:number, solutionAttempt:SolutionAttempt) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.post(`/problems/${problemId}/solution-attempts`, {
      name: solutionAttempt.name,
      description: solutionAttempt.description
    })
    .then(response => {

      const page = getCurrentProblemSolutionAttemptsPageAfterCreateAttempt(getState().problems)
      
      dispatch(fetchAllSolutionAttempts(problemId, {page}))
    })
  }
}

export const deleteById = (problemId: number) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.delete(`/problems/${problemId}`)
    .then(response => {
      const  page = getCurrentPageAfterDelete(getState().problems)

      dispatch(fetchAllProblems({ page }))
    })
  }
}

export const deleteProblemComment = (problemId: number, commentId:number) => {
  return (dispatch:any, getState:any) => {

    axios.delete(`/problems/${problemId}/comments/${commentId}`)
    .then(response => {
      
      const page = getCurrentCommentPageAfterDeleteComment(getState().problems)
      
      dispatch(fetchAllProblemComments(problemId, {page}))
    })
  }
}

export const deleteSolutionAttempt = (problemId: number, solutionAttemptId:number) => {
  return (dispatch:any, getState:any) => {

    axios.delete(`/problems/${problemId}/solution-attempts/${solutionAttemptId}`)
    .then(response => {
      
      const page = getCurrentProblemSolutionAttemptsPageAfterDeleteAttempt(getState().problems)

      dispatch(fetchAllSolutionAttempts(problemId, {page: page}))
    })
  }
}

export const fetchAllProblems = (filters:any = {}) => {
  return (dispatch: any) => {
    
    filters.sort = 'id'
    const queryString = buildQueryString(filters)

    axios.get(`/problems${queryString}`)
    .then(response => {
      const data = response.data
      dispatch(setProblems(data))
    })
    .catch(error => error)
  }
}

export const fetchAllProblemComments = (problemId:number, filters:any = {}) => {
  return (dispatch: any) => {

    if (filters.sort === undefined) filters.sort = 'createdAt,desc'
    const queryString = buildQueryString(filters)

    axios.get(`/problems/${problemId}/comments${queryString}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentProblemComments(data))
    })
    .catch(error => error)
  }
}

export const fetchAllSolutionAttempts = (problemId:number, filters:any = {}) => {
  return (dispatch: any) => {

    if (filters.sort === undefined) filters.sort = 'createdAt,desc'    
    const queryString = buildQueryString(filters)

    axios.get(`/problems/${problemId}/solution-attempts${queryString}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentProblemSolutionAttempts(data))
    })
    .catch(error => error)
  }
}

export const fetchProblemById = (id: number) => {
  return (dispatch: any) => {
    axios.get(`/problems/${id}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentProblem(data))
    })
    .catch(error => error)
  }
}

export const fetchSolutionAttemptById = (problemId: number, solutionAttemptId: number) => {
  return (dispatch: any) => {
    axios.get(`/problems/${problemId}/solution-attempts/${solutionAttemptId}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentProblemSolutionAttempt(data))
    })
    .catch(error => error)
  }
}

export const updateProblem = (id:number, problem:Problem) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.put(`/problems/${id}`, {
      name: problem.name,
      description: problem.description
    })
    .then(response => {

      dispatch(fetchProblemById(id))
    })
  }
}

export const updateProblemRelatedConcepts = (problemId:number, conceptsIds:number[]) => {
  return (dispatch:any, getState:any) => {

    axios.put(`/problems/${problemId}/concepts`, {
      conceptsIds: conceptsIds
    })
    .then(response => {
      dispatch(fetchProblemById(problemId))
    })
  }
}

export const updateSolutionAttempt = (problemId:number, solutionAttemptId:number, attempt: SolutionAttempt) => {
  return (dispatch:any, getState:any) => {

    axios.put(`/problems/${problemId}/solution-attempts/${solutionAttemptId}`, {
      name: attempt.name,
      description: attempt.description
    })
    .then(response => {

      dispatch(fetchSolutionAttemptById(problemId, solutionAttemptId))
    })
  }
}


export const loadingProblems = () => {
  return {
    type: ProblemsActions.LOADING_PROBLEMS
  }
}

export const setProblems = (problems: any) => {
  return {
    type: ProblemsActions.SET_PROBLEMS,
    data: problems
  }
}

export const setProblemCurrentPage = (currentPage: number) => {
  return {
    type: ProblemsActions.SET_CURRENT_PAGE,
    currentPage: currentPage
  }
}

export const setCurrentProblem = (problems: Problem) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM,
    data: problems
  }
}

export const setCurrentProblemComments = (data: any) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM_COMMENTS,
    data
  }
}

export const setCurrentProblemSolutionAttempt = (data: any) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM_SOLUTION_ATTEMPT,
    data
  }
}

export const setCurrentProblemSolutionAttempts = (data: any) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS,
    data
  }
}

export const setCurrentProblemCommentsPage = (page: number) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM_COMMENTS_PAGE,
    currentPage: page
  }
}

export const setCurrentProblemSolutionAttemptsPage = (page: number) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM_SOLUTION_ATTEMPTS_PAGE,
    currentPage: page
  }
}


const getCurrentPageAfterCreate = (problemsReducer: IProblemsInitialState) => {
  const { currentPage, totalItems, itemsPerPage } = problemsReducer
  
  return calcCurrentPage(currentPage, (totalItems + 1), itemsPerPage)
}

const getCurrentPageAfterDelete = (problemsReducer: IProblemsInitialState) => {
  const { currentPage, totalItems, itemsPerPage } = problemsReducer
  
  return calcCurrentPage(currentPage, (totalItems -1), itemsPerPage)
}

const getCurrentCommentPageAfterCreateComment = (problemsReducer: IProblemsInitialState) => {
  const { currentProblemCommentsPage, 
    currentProblemCommentsTotalItems, 
    currentProblemCommentsItemsPerPage } = problemsReducer
    
  return calcCurrentPage(
          currentProblemCommentsPage, 
          (currentProblemCommentsTotalItems + 1),
          currentProblemCommentsItemsPerPage )
}

const getCurrentCommentPageAfterDeleteComment = (problemsReducer: IProblemsInitialState) => {
  const { currentProblemCommentsPage, 
    currentProblemCommentsTotalItems, 
    currentProblemCommentsItemsPerPage } = problemsReducer
    
  return calcCurrentPage(
          currentProblemCommentsPage, 
          (currentProblemCommentsTotalItems -1),
          currentProblemCommentsItemsPerPage )
}

const getCurrentProblemSolutionAttemptsPageAfterCreateAttempt = (problemsReducer: IProblemsInitialState) => {
  const { currentProblemSolutionAttemptsPage, 
    currentProblemSolutionAttemptsTotalItems, 
    currentProblemSolutionAttemptsItemsPerPage } = problemsReducer

  return calcCurrentPage(
          currentProblemSolutionAttemptsPage,
          (currentProblemSolutionAttemptsTotalItems + 1),
          currentProblemSolutionAttemptsItemsPerPage)
}

const getCurrentProblemSolutionAttemptsPageAfterDeleteAttempt = (problemsReducer: IProblemsInitialState) => {
  const { currentProblemSolutionAttemptsPage, 
    currentProblemSolutionAttemptsTotalItems, 
    currentProblemSolutionAttemptsItemsPerPage } = problemsReducer

  return calcCurrentPage(
          currentProblemSolutionAttemptsPage,
          (currentProblemSolutionAttemptsTotalItems - 1),
          currentProblemSolutionAttemptsItemsPerPage)
}

const calcCurrentPage = (actualPage:number, totalItems:number, itemsPerPage:number):number => {

  const maxOfPages = Math.ceil(totalItems / itemsPerPage)
  const calculatedPage = (maxOfPages < actualPage)
      ? maxOfPages
      : actualPage

  return calculatedPage
}
