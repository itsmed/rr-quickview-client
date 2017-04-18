import { TOGGLE_IS_FETCHING } from '../../actions';

export function isFetching(state = false, action) {
  if (action.type === TOGGLE_IS_FETCHING) {
    return !state;
  } else {
    return state;
  }
}
