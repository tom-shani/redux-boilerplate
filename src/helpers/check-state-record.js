import each from 'lodash/each';
import {fromJS} from 'immutable';

const checkStateRecord = (state, Record) => {
  let nextState;

  if (state instanceof Record === false) {
    nextState = {};
    each(state, (value, key) => {
      if (typeof value === 'object') nextState[key] = fromJS(value);
    });
    nextState = new Record(nextState);
  } else {
    nextState = state;
  }

  return nextState;
};

export default checkStateRecord;
