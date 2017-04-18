import { UPDATE_SEARCH_CATEGORY } from '../types';

export function updateSearchCategory(category) {
  return {
    type: UPDATE_SEARCH_CATEGORY,
    payload: category,
  }
}