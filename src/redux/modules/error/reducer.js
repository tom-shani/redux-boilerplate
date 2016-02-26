import checkStateRecord from '../../../helpers/check-state-record';
import createReducer from '../../create-reducer';
import ErrorRecord from './schema';

export const ERROR = 'redux-boilerplate/ERROR';
export const CLEAR_ERROR = 'redux-boilerplate/CLEAR_ERROR';

const error = createReducer(new ErrorRecord(), ErrorRecord, {
  ['@@INIT'](state, action) { return checkStateRecord(state, ErrorRecord); },
  [ERROR](state, action) {
    return state.withMutations((nextState) =>
        nextState
          .set('err', action.payload)
      );
  },
  [CLEAR_ERROR](state, action) {
    return state.withMutations((nextState) =>
      nextState
        .set('err', action.payload)
    );
  }
});

export default error;
