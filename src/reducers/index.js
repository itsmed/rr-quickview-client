import { combineReducers } from 'redux';

import { authReducer } from './auth/authReducer';
import { isFetching } from './isFetching/isFetching';
import { apiErrorReducer } from './apiError/apiError';
import { receiveApiData } from './receiveApiData/receiveApiData';

const searchCategories = () => ['users', 'employees', 'transactions'];

const rootReducer = combineReducers({
  auth: authReducer,
  isFetching,
  searchCategories,
  apiErrorMessage: apiErrorReducer,
  data: receiveApiData,
});

export default rootReducer;
