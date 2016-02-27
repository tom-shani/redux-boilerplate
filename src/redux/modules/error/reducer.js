import {app} from '../../../config';
import checkStateRecord from '../../../helpers/check-state-record';
import createReducer from '../../create-reducer';
import ErrorRecord from './schema';

const prefix = app.title;
export const CLEAR_ERROR = `${prefix}/CLEAR_ERROR`;
export const ERROR = `${prefix}/ERROR`;

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
