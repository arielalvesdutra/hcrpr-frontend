import { TechniquesActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'
import Technique from '../../models/Technique'


const getCurrentPageFromTechniquesReducer = (techniquesReducer: any) => {
  const { currentPage, totalItems, itemsPerPage } = techniquesReducer
  const currentTotalItems = totalItems -1
  const maxOfPages = Math.ceil(currentTotalItems / itemsPerPage)
  const page = (maxOfPages < currentPage)
          ? maxOfPages 
          : currentPage 
  return page
}

export const createTechnique = (technique:Technique) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingTechniques())

    axios.post('/techniques', {
      name: technique.name,
      description: technique.description
    })
    .then(response => {

      const page = getCurrentPageFromTechniquesReducer(getState().techniques)

      dispatch(fetchAllTechniques({ page }))
    })
  }
}

export const deleteById = (techniqueId: number) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingTechniques())

    axios.delete(`/techniques/${techniqueId}`)
    .then(response => {
      const page = getCurrentPageFromTechniquesReducer(getState().techniques)

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

      const page = getCurrentPageFromTechniquesReducer(getState().techniques)

      dispatch(fetchAllTechniques({ page }))
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
