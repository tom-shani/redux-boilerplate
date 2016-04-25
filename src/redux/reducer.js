import {combineReducers} from 'redux'

import error from './modules/error/reducer'
import routing from './modules/routing/reducer'

export default combineReducers({
  error,
  routing
})
