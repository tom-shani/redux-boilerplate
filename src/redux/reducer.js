import {combineReducers} from 'redux';

import error from './modules/error/reducer';
import router from './modules/router';

export default combineReducers({
  error,
  router
});
