import { combineReducers } from 'redux';

import {
  authenticateUser
} from './authenticateUser';

const rootReducer = combineReducers({
  auth: authenticateUser
});

export default rootReducer;
