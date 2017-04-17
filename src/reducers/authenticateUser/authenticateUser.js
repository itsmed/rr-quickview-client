import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../../actions';

export function authenticateUser(state = {
  token: null,
}, action) {
  console.log('state', action);
  return state;
}
