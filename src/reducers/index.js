import { combineReducers } from 'redux';

import { authReducer } from './auth/authReducer';
import { isFetching } from './isFetching/isFetching';
import { getUsers } from './getUsers/getUsers';

const searchCategories = () => ['users', 'employees', 'transactions'];

const rootReducer = combineReducers({
  auth: authReducer,
  isFetching,
  searchCategories,
  users: getUsers
});

export default rootReducer;
