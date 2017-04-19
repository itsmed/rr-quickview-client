import { API_ERROR } from '../../actions';

export function apiErrorReducer(state = '', action) {
  if (action.type === API_ERROR) {
    console.log('action', action.payload);
    let newState = action.payload;
    return newState;
  } else {
    return state;
  }
}