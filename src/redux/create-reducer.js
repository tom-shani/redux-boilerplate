import checkStateRecord from '../helpers/check-state-record';

const checkState = (state, Schema = null) => Schema !== null ? checkStateRecord(state, Schema) : state;

export default function createReducer(initialState, Schema = null, handlers) {
  const preppedState = checkState(initialState, Schema);

  return function reducer(prevState = preppedState, action) {
    const state = checkState(prevState, Schema);
    return handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state;
  };
}
