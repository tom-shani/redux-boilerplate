import {combineReducers} from 'redux'

import error from './modules/error/reducer'
import routing from './modules/routing'

export default combineReducers({
  error,
  routing
})
