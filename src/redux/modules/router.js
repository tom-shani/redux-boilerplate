import createReducer from '../create-reducer.js';
import {Record} from 'immutable';

const RouteRecord = new Record({
  location: {
    action: '',
    hash: '',
    key: '',
    pathname: '',
    search: '/',
    state: null
  }
});

const prefix = 'redux-boilerplate';
export const INIT_LOCATION = `${prefix}/INIT_LOCATION`;
export const UPDATE_LOCATION = `${prefix}/UPDATE_LOCATION`;

export const initLocation = (payload) => (dispatch, getState) => {
  dispatch({payload, type: INIT_LOCATION});
};

export const updateLocation = (payload) => (dispatch, getState) => {
  dispatch({payload, type: UPDATE_LOCATION});
};

const reducer = createReducer(new RouteRecord(), RouteRecord, {
  [INIT_LOCATION](state, action) { return state.set('location', action.payload); },
  [UPDATE_LOCATION](state, action) { return state.set('location', action.payload); }
});

export default reducer;
