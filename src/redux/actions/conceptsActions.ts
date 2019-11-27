import { ConceptsActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../query-string-builder'
import Concept from '../../models/Concept'
import { IConceptsInitialState } from '../reducers/conceptsReducer'


export const createConcept = (concept:Concept) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingConcepts())

    axios.post('/concepts', {
      name: concept.name,
      description: concept.description
    })
    .then(response => {

      const page = getCurrentPageAfterCreate(getState().concepts)

      dispatch(fetchAllConcepts({ page }))
    })
  }
}

export const deleteById = (conceptId: number) => {
  return (dispatch:any, getState:any) => {
    dispatch(loadingConcepts())

    axios.delete(`/concepts/${conceptId}`)
    .then(response => {
      const  page = getCurrentPageAfterDelete(getState().concepts)

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


const getCurrentPageAfterCreate = (conceptsReducer: IConceptsInitialState) => {
  const { currentPage, totalItems, itemsPerPage } = conceptsReducer

  return calcCurrentPage(currentPage, (totalItems + 1), itemsPerPage)
}

const getCurrentPageAfterDelete = (conceptsReducer: IConceptsInitialState) => {
  const { currentPage, totalItems, itemsPerPage } = conceptsReducer

  return calcCurrentPage(currentPage, (totalItems - 1), itemsPerPage)
}

const calcCurrentPage = (actualPage:number, totalItems:number, itemsPerPage:number):number => {

  const maxOfPages = Math.ceil(totalItems / itemsPerPage)
  const calculatedPage = (maxOfPages < actualPage)
      ? maxOfPages
      : actualPage

  return calculatedPage
}
