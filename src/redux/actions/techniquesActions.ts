import { TechniquesActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'
import Technique from '../../models/Technique'
import { ITechniquesInitialState } from '../reducers/techniquesReducer'
import { handlePageError } from './errorsActions'


export const createTechnique = (technique:Technique) => {
  return (dispatch:any, getState:any) => {
    dispatch(setIsLoadingTechniques(true))

    axios.post('/techniques', {
      name: technique.name,
      description: technique.description
    })
    .then(response => {

      const page = getCurrentPageAfterCreate(getState().techniques)

      dispatch(fetchAllTechniques({ page }))
    })
  }
}

export const deleteById = (techniqueId: number) => {
  return (dispatch:any, getState:any) => {
    dispatch(setIsLoadingTechniques(true))

    axios.delete(`/techniques/${techniqueId}`)
    .then(response => {
      const page = getCurrentPageAfterDelete(getState().techniques)

      dispatch(fetchAllTechniques({ page }))
    })
  }
}

export const fetchAllTechniques = (filters:any = {}) => {
  return (dispatch: any) => {
    dispatch(setIsLoadingTechniques(true))

    filters.sort = 'id'
    const queryString = buildQueryString(filters)

    axios.get(`/techniques${queryString}`)
    .then(response => {
      const data = response.data      
      dispatch(setTechniques(data))
    })
    .catch(error => handlePageError(error, dispatch))
    .finally(() => dispatch(setIsLoadingTechniques(false)))
  }
}

export const fetchTechniqueById = (id: number) => {
  return (dispatch: any) => {
    dispatch(setIsLoadingCurrentTechnique(true))

    axios.get(`/techniques/${id}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentTechnique(data))
    })
    .catch(error => handlePageError(error, dispatch))
    .finally(() => dispatch(setIsLoadingCurrentTechnique(false)))
  }
}

export const updateTechnique = (id:number, technique:Technique) => {
  return (dispatch:any, getState:any) => {
    dispatch(setIsLoadingTechniques(true))

    axios.put(`/techniques/${id}`, {
      name: technique.name,
      description: technique.description
    })
    .then(response => {

      dispatch(fetchTechniqueById(id))
    })
  }
}

export const setIsLoadingCurrentTechnique = (isLoading: boolean) => {
  return {
    type: TechniquesActions.SET_IS_LOADING_CURRENT_TECHNIQUE,
    isLoading
  }
}

export const setIsLoadingTechniques = (isLoading: boolean) => {
  return {
    type: TechniquesActions.SET_IS_LOADING_TECHNIQUES,
    isLoading
  }
}

export const setCurrentTechnique = (technique: Technique) => {
  return {
    type: TechniquesActions.SET_CURRENT_TECHNIQUE,
    data: technique
  }
}

export const setTechniques = (techniques: any) => {
  return {
    type: TechniquesActions.SET_TECHNIQUES,
    data: techniques
  }
}

export const setTechniqueCurrentPage = (currentPage: number) => {
  return {
    type: TechniquesActions.SET_CURRENT_PAGE,
    currentPage: currentPage
  }
}


const getCurrentPageAfterCreate = (techniquesReducer: ITechniquesInitialState) => {
  const { currentPage, totalItems, itemsPerPage } = techniquesReducer

  return calcCurrentPage(currentPage, (totalItems + 1), itemsPerPage)
}

const getCurrentPageAfterDelete = (techniquesReducer: ITechniquesInitialState) => {
  const { currentPage, totalItems, itemsPerPage } = techniquesReducer

  return calcCurrentPage(currentPage, (totalItems - 1), itemsPerPage)
}

const calcCurrentPage = (actualPage:number, totalItems:number, itemsPerPage:number):number => {

  const maxOfPages = Math.ceil(totalItems / itemsPerPage)
  const calculatedPage = (maxOfPages < actualPage)
      ? maxOfPages
      : actualPage

  return calculatedPage
}
