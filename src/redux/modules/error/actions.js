import {
  CLEAR_ERROR,
  ERROR
} from './constants'

export const clearError = () => ({type: CLEAR_ERROR})

export const throwError = (payload : Error) => ({
  payload,
  type: ERROR
})
