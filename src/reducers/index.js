import { combineReducers } from 'redux';

import { authReducer } from './auth/authReducer';
import { isFetching } from './isFetching/isFetching';

const rootReducer = combineReducers({
  auth: authReducer,
  isFetching,
});

export default rootReducer;
