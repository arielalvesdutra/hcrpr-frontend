import { ErrorActions } from '../actions/actionTypes'

export enum ErrorConsts {
  ERROR_400 = 'ERROR_400',
  ERROR_404 = 'ERROR_404',
  SERVICE_UNAVAILABLE= 'SERVICE_UNAVAILABLE'
}

export interface IErrorsInitialState {
  pageError: string
}

let initialState:IErrorsInitialState = {
  pageError: ''
}

export default (state = initialState, action:any) => {
  switch(action.type) {
    case ErrorActions.SET_ERROR_404: {
      return {
        ...state,
        pageError: ErrorConsts.ERROR_404
      }
    }
    case ErrorActions.SET_ERROR_400: {
      return {
        ...state,
        pageError: ErrorConsts.ERROR_400
      }
    }
    case ErrorActions.SET_ERROR_SERVICE_UNAVAILABLE: {
      return {
        ...state,
        pageError: ErrorConsts.SERVICE_UNAVAILABLE
      }
    }
    case ErrorActions.CLEAR_PAGE_ERROR: {
      return {
        ...state,
        pageError: ''
      }
    }
    default: 
      return state
  }
}
