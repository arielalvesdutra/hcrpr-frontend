import { ProblemsActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'
import Problem from '../../models/Problem'


const getCurrentPageFromProblemsReducer = (problemsReducer: any) => {
  const { currentPage, totalItems, itemsPerPage } = problemsReducer
  const currentTotalItems = totalItems -1
  const maxOfPages = Math.ceil(currentTotalItems / itemsPerPage)
  const page = (maxOfPages < currentPage)
          ? maxOfPages 
          : currentPage 
  return page
}

export const createProblem = (problem:Problem) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.post('/problems', {
      name: problem.name,
      description: problem.description
    })
    .then(response => {

      const page = getCurrentPageFromProblemsReducer(getState().problems)

      dispatch(fetchAllProblems({ page }))
    })
  }
}

export const deleteById = (problemId: number) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.delete(`/problems/${problemId}`)
    .then(response => {
      const  page = getCurrentPageFromProblemsReducer(getState().problems)

      dispatch(fetchAllProblems({ page }))
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

export const setProblems = (problems: any) => {
  return {
    type: ProblemsActions.SET_PROBLEMS,
    data: problems
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

export const updateProblem = (id:number, problem:Problem) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingProblems())

    axios.put(`/problems/${id}`, {
      name: problem.name,
      description: problem.description
    })
    .then(response => {

      const page = getCurrentPageFromProblemsReducer(getState().problems)

      dispatch(fetchAllProblems({ page }))
      dispatch(fetchProblemById(id))
    })
  }
}

export const loadingProblems = () => {
  return {
    type: ProblemsActions.LOADING_PROBLEMS
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
