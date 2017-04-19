import { API_ERROR } from '../../actions';

export function apiErrorReducer(state = '', action) {
  if (action.type === API_ERROR) {
    return action.payload;
  } else {
    return state;
  }
}