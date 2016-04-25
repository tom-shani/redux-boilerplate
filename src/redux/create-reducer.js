export default function createReducer(initialState, handlers : {}) {
  return function reducer(state = initialState, action: {type : string, payload : ? {}, error : ? Error}) {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
  }
}
