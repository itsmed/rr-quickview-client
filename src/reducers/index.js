import { combineReducers } from 'redux';

import { authReducer } from './auth/authReducer';
import { isFetching } from './isFetching/isFetching';
import { apiErrorReducer } from './apiError/apiError';
import { receiveApiData } from './receiveApiData/receiveApiData';
import { updateSearchCategory } from './updateSearchCategory/updateSearchCategory';

const searchCategories = () => ['users', 'employees', 'transactions'];

const rootReducer = combineReducers({
  auth: authReducer,
  isFetching,
  searchCategories,
  category: updateSearchCategory,
  apiErrorMessage: apiErrorReducer,
  data: receiveApiData,
});

export default rootReducer;
