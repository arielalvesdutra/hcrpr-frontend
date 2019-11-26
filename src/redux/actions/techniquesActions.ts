import { TechniquesActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'
import Technique from '../../models/Technique'
import { ITechniquesInitialState } from '../reducers/techniquesReducer'


export const createTechnique = (technique:Technique) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingTechniques())

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
    dispatch(loadingTechniques())

    axios.delete(`/techniques/${techniqueId}`)
    .then(response => {
      const page = getCurrentPageAfterDelete(getState().techniques)

      dispatch(fetchAllTechniques({ page }))
    })
  }
}

export const fetchAllTechniques = (filters:any = {}) => {
  return (dispatch: any) => {
    
    filters.sort = 'id'
    const queryString = buildQueryString(filters)

    axios.get(`/techniques${queryString}`)
    .then(response => {
      const data = response.data      
      dispatch(setTechniques(data))
    })
    .catch(error => error)
  }
}

export const fetchTechniqueById = (id: number) => {
  return (dispatch: any) => {
    axios.get(`/techniques/${id}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentTechnique(data))
    })
    .catch(error => error)
  }
}

export const updateTechnique = (id:number, technique:Technique) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingTechniques())

    axios.put(`/techniques/${id}`, {
      name: technique.name,
      description: technique.description
    })
    .then(response => {

      dispatch(fetchTechniqueById(id))
    })
  }
}

export const loadingTechniques = () => {
  return {
    type: TechniquesActions.LOADING_TECHNIQUES 
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
