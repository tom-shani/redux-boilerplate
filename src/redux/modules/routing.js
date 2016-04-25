import createReducer from '../create-reducer'
import {Record} from 'immutable'
import {LOCATION_CHANGE} from 'react-router-redux'

export const RoutingRecord = new Record({
  location: {}
})

const routing = createReducer(new RoutingRecord(), {
  [LOCATION_CHANGE](state, action) { return state.merge({location: action.payload}) }
})

export default routing
