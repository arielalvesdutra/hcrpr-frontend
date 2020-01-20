import { ErrorActions} from './actionTypes'

export const clearPageErrors = () => {
  return {
    type: ErrorActions.CLEAR_PAGE_ERROR
  }
}

export const setError404 = () => {
  return {
    type: ErrorActions.SET_ERROR_404
  }
}

export const setError400 = () => {
  return {
    type: ErrorActions.SET_ERROR_400
  }
}

export const setErrorServiceUnavailable = () => {
  return {
    type: ErrorActions.SET_ERROR_SERVICE_UNAVAILABLE
  }
}

export const handlePageError = (error: any, dispatch: any) => {
  if (error.response === undefined) {
    return dispatch(setErrorServiceUnavailable())
  }

  if (error.response.status === 404) {
    dispatch(setError404())
    return        
  }

  if (error.response.status === 400) {
    dispatch(setError400())
    return        
  }
}
