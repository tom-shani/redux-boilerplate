import createReducer from '../create-reducer';
import {Record} from 'immutable';

export const ERROR = 'pomo/ERROR';
export const CLEAR_ERROR = 'pomo/CLEAR_ERROR';

const StateRecord = new Record({
  err: null
});

const error = createReducer(StateRecord, {
  [ERROR](state, action) {
    return state.withMutations(newState =>
        newState
          .set('err', action.payload)
      );
  },
  [CLEAR_ERROR](state, action) {
    return state.withMutations(newState =>
      newState
        .set('err', action.payload)
    );
  }
});

export default error;
