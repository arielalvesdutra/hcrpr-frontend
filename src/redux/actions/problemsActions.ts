import { ProblemsActions } from './actionTypes'
import { IProblemsInitialState } from '../reducers/problemsReducer'
import axios from '../../axios'
import { buildQueryString } from '../../helpers/query-string-builder'

import Problem from '../../models/Problem'
import ProblemComment from '../../models/ProblemComment'
import SolutionAttempt from '../../models/SolutionAttempt'
import { handlePageError } from './errorsActions'


export const clearCurrentProblemData = () => {
  return (dispatch: any) => {
    dispatch(setIsLoadingCurrentProblem(true))
    dispatch(setCurrentProblem({} as Problem))
    dispatch(setCurrentProblemComments([] as Comment[]))
    dispatch(setCurrentProblemRelatedConcepts({ data: [], isLoading: false}))
  }
}

export const createProblem = (problem: Problem) => {
  return (dispatch: any, getState: any) => {
    dispatch(setIsLoadingProblems(true))

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

export const createProblemComment = (problemId: number, comment: ProblemComment) => {
  return (dispatch: any, getState: any) => {
    dispatch(setIsLoadingProblems(true))

    axios.post(`/problems/${problemId}/comments`, {
      content: comment.content
    })
      .then(response => {

        const page = getCurrentCommentPageAfterCreateComment(getState().problems)

        dispatch(fetchAllProblemComments(problemId, { page }))
      })
  }
}

export const createSolutionAttempt = (problemId: number, solutionAttempt: SolutionAttempt) => {
  return (dispatch: any, getState: any) => {
    dispatch(setIsLoadingProblems(true))

    axios.post(`/problems/${problemId}/solution-attempts`, {
      name: solutionAttempt.name,
      description: solutionAttempt.description
    })
      .then(response => {

        const page = getCurrentProblemSolutionAttemptsPageAfterCreateAttempt(getState().problems)

        dispatch(fetchAllSolutionAttempts(problemId, { page }))
      })
  }
}

export const deleteById = (problemId: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(setIsLoadingProblems(true))

    axios.delete(`/problems/${problemId}`)
      .then(response => {
        const page = getCurrentPageAfterDelete(getState().problems)

        dispatch(fetchAllProblems({ page }))
      })
  }
}

export const deleteProblemComment = (problemId: number, commentId: number) => {
  return (dispatch: any, getState: any) => {

    axios.delete(`/problems/${problemId}/comments/${commentId}`)
      .then(response => {

        const page = getCurrentCommentPageAfterDeleteComment(getState().problems)

        dispatch(fetchAllProblemComments(problemId, { page }))
      })
  }
}

export const deleteSolutionAttempt = (problemId: number, solutionAttemptId: number) => {
  return (dispatch: any, getState: any) => {

    axios.delete(`/problems/${problemId}/solution-attempts/${solutionAttemptId}`)
      .then(response => {

        const page = getCurrentProblemSolutionAttemptsPageAfterDeleteAttempt(getState().problems)

        dispatch(fetchAllSolutionAttempts(problemId, { page: page }))
      })
  }
}

export const fetchAllProblems = (filters: any = {}) => {
  return (dispatch: any) => {
    dispatch(setIsLoadingProblems(true))

    filters.sort = 'id'
    const queryString = buildQueryString(filters)

    axios.get(`/problems${queryString}`)
      .then(({data}) => dispatch(setProblems(data)))
      .catch(error => handlePageError(error, dispatch))
      .finally(() => dispatch(setIsLoadingProblems(false)))
  }
}

export const fetchAllProblemComments = (problemId: number, filters: any = {}) => {
  return (dispatch: any) => {
    dispatch(setIsLoadingCurrentProblemComments(true))

    if (filters.sort === undefined) filters.sort = 'createdAt,desc'
    const queryString = buildQueryString(filters)

    axios.get(`/problems/${problemId}/comments${queryString}`)
      .then(({ data }) => {
        dispatch(setCurrentProblemComments(data))
        dispatch(setIsLoadingCurrentProblemComments(false))
      })
      .catch(error => handlePageError(error, dispatch))
  }
}

export const fetchAllProblemRelatedConcepts = (problemId: number, filters: any = {}) => {
  return (dispatch: any) => {
    dispatch(setCurrentProblemRelatedConcepts({data: [], isLoading: true}))

    if (filters.sort === undefined) filters.sort = 'createdAt,desc'

    filters.size = 100
    const queryString = buildQueryString(filters)

    axios.get(`/problems/${problemId}/concepts${queryString}`)
      .then(({data}) => dispatch(setCurrentProblemRelatedConcepts({data, isLoading: false})))
      .catch(error => error)
  }
}

export const fetchAllSolutionAttempts = (problemId: number, filters: any = {}) => {
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
    dispatch(setIsLoadingCurrentProblem(true))

    axios.get(`/problems/${id}`)
      .then(({ data }) => dispatch(setCurrentProblem(data)))
      .catch(error => handlePageError(error, dispatch))
      .finally(() => dispatch(setIsLoadingCurrentProblem(false)))
  }
}

export const fetchSolutionAttemptById = (problemId: number, solutionAttemptId: number) => {
  return (dispatch: any) => {
    dispatch(setCurrentProblemSolutionAttempt({} as SolutionAttempt))
    dispatch(setIsLoadingCurrentSolutionAttempt(true))

    axios.get(`/problems/${problemId}/solution-attempts/${solutionAttemptId}`)
      .then(({ data }) => {
        dispatch(setCurrentProblemSolutionAttempt(data))
      })

      .catch(error => handlePageError(error, dispatch))
      .finally(() => dispatch(setIsLoadingCurrentSolutionAttempt(false)))
  }
}

export const updateProblem = (id: number, problem: Problem) => {
  return (dispatch: any) => {
    dispatch(setIsLoadingCurrentProblem(true))

    axios.put(`/problems/${id}`, {
      name: problem.name,
      description: problem.description
    })
      .then(_ => dispatch(fetchProblemById(id)))
      .catch(error => handlePageError(error, dispatch))
  }
}

export const updateProblemRelatedConcepts = (problemId: number, conceptsIds: number[]) => {
  return (dispatch: any) => {

    dispatch(setCurrentProblemRelatedConcepts({data: [], isLoading: true}))
    
    axios.put(`/problems/${problemId}/concepts`, { conceptsIds })
      .then(_ => dispatch(fetchAllProblemRelatedConcepts(problemId)))
  }
}

export const updateSolutionAttempt = (problemId: number, solutionAttemptId: number, attempt: SolutionAttempt) => {
  return (dispatch: any) => {

    axios.put(`/problems/${problemId}/solution-attempts/${solutionAttemptId}`, {
      name: attempt.name,
      description: attempt.description
    })
      .then(_ => dispatch(fetchSolutionAttemptById(problemId, solutionAttemptId)))
      .catch(error => handlePageError(error, dispatch))
      .finally(() => dispatch(setIsLoadingCurrentSolutionAttempt(false)))
  }
}

export const setIsLoadingCurrentProblem = (isLoading: boolean) => {
  return {
    type: ProblemsActions.SET_IS_LOADING_CURRENT_PROBLEM,
    isLoading
  }
}

export const setIsLoadingCurrentProblemComments = (isLoading: boolean) => {
  return {
    type: ProblemsActions.SET_IS_LOADING_CURRENT_PROBLEM_COMMENTS,
    isLoading
  }
}

export const setIsLoadingCurrentSolutionAttempt = (isLoading: boolean) => {
  return {
    type: ProblemsActions.SET_IS_LOADING_CURRENT_PROBLEM_SOLUTION_ATTEMPT,
    isLoading
  }
}

export const setIsLoadingProblems = (isLoading: boolean) => {
  return {
    type: ProblemsActions.SET_IS_LOADING_PROBLEMS,
    isLoading
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

export const setCurrentProblemComments = (data: Comment[]) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM_COMMENTS,
    data
  }
}

export const setCurrentProblemRelatedConcepts = ({ data = [], isLoading = false}) => {
  return {
    type: ProblemsActions.SET_CURRENT_PROBLEM_RELATED_CONCEPTS,
    data,
    isLoading
  }
}

export const setCurrentProblemSolutionAttempt = (data: SolutionAttempt) => {
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

  return calcCurrentPage(currentPage, (totalItems - 1), itemsPerPage)
}

const getCurrentCommentPageAfterCreateComment = (problemsReducer: IProblemsInitialState) => {
  const { currentProblemCommentsPage,
    currentProblemCommentsTotalItems,
    currentProblemCommentsItemsPerPage } = problemsReducer

  return calcCurrentPage(
    currentProblemCommentsPage,
    (currentProblemCommentsTotalItems + 1),
    currentProblemCommentsItemsPerPage)
}

const getCurrentCommentPageAfterDeleteComment = (problemsReducer: IProblemsInitialState) => {
  const { currentProblemCommentsPage,
    currentProblemCommentsTotalItems,
    currentProblemCommentsItemsPerPage } = problemsReducer

  return calcCurrentPage(
    currentProblemCommentsPage,
    (currentProblemCommentsTotalItems - 1),
    currentProblemCommentsItemsPerPage)
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

const calcCurrentPage = (actualPage: number, totalItems: number, itemsPerPage: number): number => {

  const maxOfPages = Math.ceil(totalItems / itemsPerPage)
  const calculatedPage = (maxOfPages < actualPage)
    ? maxOfPages
    : actualPage

  return calculatedPage
}
