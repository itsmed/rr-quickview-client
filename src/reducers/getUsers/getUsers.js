import {
  RECEIVE_ALL_USERS_SUCCESS,
  RECEIVE_ALL_USERS_FAILURE,
} from '../../actions';

export function getUsers(state = {
  allUsers: [],
}, action) {
  switch(action.type) {
    case RECEIVE_ALL_USERS_SUCCESS:
      return Object.assign({}, state, {
        allUsers: action.payload,
      });
    case RECEIVE_ALL_USERS_FAILURE:
      // add error stuff
      return state;
    default:
      return state;
  }
}