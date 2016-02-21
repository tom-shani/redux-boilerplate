import {combineReducers} from 'redux';

import error from './modules/error';
import routing from './modules/routing';

export default combineReducers({
  error,
  routing
});
