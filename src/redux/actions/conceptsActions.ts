import { ConceptsActions } from './actionTypes'
import axios from '../../axios'
import { buildQueryString } from '../../helpers/query-string-builder'
import Concept from '../../models/Concept'
import { IConceptsInitialState } from '../reducers/conceptsReducer'
import { handlePageError } from './errorsActions'


export const createConcept = (concept:Concept) => {
  return (dispatch:any, getState:any) => {
    dispatch(setIsLoadingConcepts(true))

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
    dispatch(setIsLoadingConcepts(true))

    axios.delete(`/concepts/${conceptId}`)
    .then(response => {
      const  page = getCurrentPageAfterDelete(getState().concepts)

      dispatch(fetchAllConcepts({ page }))
    })
  }
}

export const fetchAllConcepts = (filters:any = {}) => {
  return (dispatch: any) => {
    dispatch(setIsLoadingConcepts(true))

    filters.sort = 'id'
    const queryString = buildQueryString(filters)

    axios.get(`/concepts${queryString}`)
    .then(({data}) => {
      dispatch(setConcepts(data))
    })
    .catch(error => handlePageError(error, dispatch))
    .finally(() => dispatch(setIsLoadingConcepts(false)))
  }
}

export const fetchConceptById = (id: number) => {
  return (dispatch: any) => {
    dispatch(setCurrentConcept({} as Concept))
    dispatch(setIsLoadingCurrentConcept(true))

    axios.get(`/concepts/${id}`)
    .then(response => {
      const data = response.data
      dispatch(setCurrentConcept(data))

    })
    .catch(error => handlePageError(error, dispatch))
    .finally(() => dispatch(setIsLoadingCurrentConcept(false)))
  }
}

export const updateConcept = (id:number, concept:Concept) => {
  return (dispatch:any, getState:any) => {
    dispatch(setIsLoadingConcepts(true))

    axios.put(`/concepts/${id}`, {
      name: concept.name,
      description: concept.description
    })
    .then(_ => dispatch(fetchConceptById(id)))
    .catch(error => handlePageError(error, dispatch))
    .finally(() => dispatch(setIsLoadingConcepts(false)))
  }
}


export const setIsLoadingConcepts = (isLoading: boolean) => {
  return {
    type: ConceptsActions.SET_IS_LOADING_CONCEPTS,
    isLoading
  }
}

export const setIsLoadingCurrentConcept = (isLoading: boolean) => {
  return {
    type: ConceptsActions.SET_IS_LOADING_CURRENT_CONCEPT,
    isLoading
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
