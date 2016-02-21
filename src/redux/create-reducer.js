export default function createReducer(StateRecord, handlers) {
  return function reducer(state = new StateRecord(), action) {
    const nextState = state instanceof StateRecord ? state : new StateRecord(state);
    return handlers.hasOwnProperty(action.type)
      ? handlers[action.type](nextState, action)
      : nextState;
  };
}
