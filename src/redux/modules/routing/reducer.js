import createReducer from '../../create-reducer'
import {LOCATION_CHANGE, routerReducer} from 'react-router-redux'
import {RoutingRecord} from './schema'

const routing = createReducer(new RoutingRecord(), {
  [LOCATION_CHANGE](state, action) {
    return routerReducer(state, action)
  }
})

export default routing
