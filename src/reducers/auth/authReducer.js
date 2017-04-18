import {
  AUTH_USER,
  UNAUTH_USER,
} from '../../actions';

export function authReducer(state = { isAuth: false, user: null }, action) {
  switch(action.type) {
    case UNAUTH_USER:
      return Object.assign({}, state, {
        isAuth: false,
        user: null
      });
    case AUTH_USER:
      return Object.assign({}, state, {
        isAuth: true,
        user: action.payload
      });
    default:
      return state;
  }
}
