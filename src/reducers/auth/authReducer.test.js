import {
  AUTH_USER,
  UNAUTH_USER,
} from '../../actions';

import { authReducer } from './authReducer';

const unAuthState  = {
  isAuth: false,
  user: null
};

const AuthStateMary = {
  isAuth: true,
  user: {
    name: 'Mary',
    permissions: 8
  }
}

test('authReducer returns state when passed unexpected action types', () => {
  expect(authReducer(unAuthState, {
    type: 'NOT_EXPECTED',
    payload: {
      name: 'Mary'
    }
  })).toEqual(unAuthState);
});

test('authReducer returns state when passed unexpected action types', () => {
  expect(authReducer('unAuthState', {
    type: 'TOGGLE_IS_FETCHING',
    payload: {
      name: 'Joe'
    }
  })).toBe('unAuthState');
});

test('authReducer returns state when passed unexpected action types', () => {
  expect(authReducer(unAuthState, {
    type: 'PONIES',
    payload: {
      name: 'Clyde'
    }
  })).toEqual(unAuthState);
});

test('authReducer returns unAuthState when passed type UNAUTH_USER', () => {
  expect(authReducer(AuthStateMary, {
    type: UNAUTH_USER
  })).toEqual(unAuthState);
});

test('authReducer returns AuthStateMary when passed type AUTH_USER', () => {
  expect(authReducer(unAuthState, {
    type: 'AUTH_USER',
    payload: {
      name: 'Mary',
      permissions: 8
    }
  })).toEqual(AuthStateMary);
});