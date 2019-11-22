import { ConceptsActions } from './actionTypes'
import axios from '../../axios'
import Concept from '../../models/Concept'

export const createConcept = (concept:Concept) => {
  return (dispatch:any) => {
    dispatch(loadingConcepts())

    axios.post('/concepts', {
      name: concept.name,
      description: concept.description
    })
    .then(response => {
      dispatch(fetchAllConcepts())
    })
  }
}

export const deleteById = (conceptId: number) => {
  return (dispatch:any) => {
    dispatch(loadingConcepts())

    axios.delete(`/concepts/${conceptId}`)
    .then(response => {
      dispatch(fetchAllConcepts())
    })
  }
}

export const fetchAllConcepts = () => {
  return (dispatch: any) => {
    axios.get('/concepts?sort=id')
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

export const loadingConcepts = () => {
  return {
    type: ConceptsActions.LOADING_CONCEPTS
  }
}

export const setCurrentConcept = (concepts: Concept) => {
  return {
    type: ConceptsActions.SET_CURRENT_CONCEPT,
    data: concepts
  }
}

export const setConcepts = (concepts: any) => {
  return {
    type: ConceptsActions.SET_CONCEPTS,
    data: concepts
  }
}
