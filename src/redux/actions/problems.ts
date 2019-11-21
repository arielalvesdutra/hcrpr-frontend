import { ProblemsActions } from './actionTypes'
import axios from '../../axios'

export const fetchAllProblems = () => {
  return (dispatch: any) => {
    axios.get('/problems')
    .then(response => {
      const data = response.data
      console.log('resposta:', data);
      
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
