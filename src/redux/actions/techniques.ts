import { TechniquesActions } from './actionTypes'
import axios from '../../axios'

export const fetchAllTechniques = () => {
  return (dispatch: any) => {
    axios.get('/techniques')
    .then(response => {
      const data = response.data
      console.log('resposta:', data);
      
      dispatch(setTechniques(data))
    })
    .catch(error => error)
  }
}

export const setTechniques = (techniques: any) => {
  return {
    type: TechniquesActions.SET_TECHNIQUES,
    data: techniques
  }
}
