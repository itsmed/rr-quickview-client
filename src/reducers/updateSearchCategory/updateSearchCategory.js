import { UPDATE_SEARCH_CATEGORY } from '../../actions';

export const updateSearchCategory = (state = 'users', action) => {
  switch(action.type) {
    case UPDATE_SEARCH_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}