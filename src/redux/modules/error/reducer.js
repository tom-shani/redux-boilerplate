import createReducer from '../../create-reducer'
import {ErrorRecord} from './schema'
import {
  CLEAR_ERROR,
  ERROR
} from './constants'

const error = createReducer(new ErrorRecord(), {
  [CLEAR_ERROR](state, action) { return state.set('err', null) },
  [ERROR](state, action) { return state.set('err', action.payload) }
})

export default error
