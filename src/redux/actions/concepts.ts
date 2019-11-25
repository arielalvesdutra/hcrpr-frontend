import { ConceptsActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'
import Concept from '../../models/Concept'

const getCurrentPageFromConceptsReducer = (conceptsReducer: any) => {
  const { currentPage, totalItems, itemsPerPage } = conceptsReducer
  const currentTotalItems = totalItems -1
  const maxOfPages = Math.ceil(currentTotalItems / itemsPerPage)
  const page = (maxOfPages < currentPage)
          ? maxOfPages 
          : currentPage 
  return page
}

export const createConcept = (concept:Concept) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingConcepts())

    axios.post('/concepts', {
      name: concept.name,
      description: concept.description
    })
    .then(response => {

      const page = getCurrentPageFromConceptsReducer(getState().concepts)

      dispatch(fetchAllConcepts({ page }))
    })
  }
}

export const deleteById = (conceptId: number) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingConcepts())

    axios.delete(`/concepts/${conceptId}`)
    .then(response => {
      const  page = getCurrentPageFromConceptsReducer(getState().concepts)

      dispatch(fetchAllConcepts({ page }))
    })
  }
}

export const fetchAllConcepts = (filters:any = {}) => {
  return (dispatch: any) => {
    
    filters.sort = 'id'
    const queryString = buildQueryString(filters)

    axios.get(`/concepts${queryString}`)
    .then(response => {
      const data = response.data
      dispatch(setConcepts(data))
    })
    .catch(error => error)
  }
}

export const fetchConceptById = (id: number) => {
  return (dispatch: any) => {
    axios.get(`/concepts/${id}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentConcept(data))
    })
    .catch(error => error)
  }
}

export const updateConcept = (id:number, concept:Concept) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingConcepts())

    axios.put(`/concepts/${id}`, {
      name: concept.name,
      description: concept.description
    })
    .then(response => {

      const page = getCurrentPageFromConceptsReducer(getState().concepts)

      dispatch(fetchAllConcepts({ page }))
      dispatch(fetchConceptById(id))
    })
  }
}

export const loadingConcepts = () => {
  return {
    type: ConceptsActions.LOADING_CONCEPTS
  }
}

export const setConceptCurrentPage = (currentPage: number) => {
  return {
    type: ConceptsActions.SET_CURRENT_PAGE,
    currentPage: currentPage
  }
}

export const setConcepts = (concepts: any) => {
  return {
    type: ConceptsActions.SET_CONCEPTS,
    data: concepts
  }
}

export const setCurrentConcept = (concepts: Concept) => {
  return {
    type: ConceptsActions.SET_CURRENT_CONCEPT,
    data: concepts
  }
}


