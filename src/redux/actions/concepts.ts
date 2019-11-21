import { ConceptsActions } from './actionTypes'
import axios from '../../axios'

export const fetchAllConcepts = () => {
  return (dispatch: any) => {
    axios.get('/concepts')
    .then(response => {
      const data = response.data
      console.log('resposta:', data);
      
      dispatch(setConcepts(data))
    })
    .catch(error => error)
  }
}

export const setConcepts = (concepts: any) => {
  return {
    type: ConceptsActions.SET_CONCEPTS,
    data: concepts
  }
}
