import axios from 'axios';

// export { 
//   makeTokenRequest,
//   unauthUser, 
//   checkToken,
// } from './';

import { toggleIsFetching } from './toggleIsFetching/toggleIsFetching';

import {
  AUTH_USER,
  UNAUTH_USER,
} from './types';

export function makeTokenRequest(username, password) {
  return dispatch => {
    dispatch(toggleIsFetching());
    return axios.post('http://localhost:3000/api/auth/signin', { username, password })
      .then(res => dispatch(receiveTokenSuccess(res.data.token)))
      .catch(err => dispatch(receiveTokenFailure(err.message)));
  }
}

export function checkToken() {
  return dispatch => {
    let token = localStorage.getItem('hero-token');
    if (token === '' || token === null) {
      return dispatch(unauthUser('No data present'));
    } else {
      return dispatch(authUser(token));
    }
  }
}

function receiveTokenSuccess(token) {
  return (dispatch) => {
    dispatch(toggleIsFetching());
    dispatch(authUser(token));
  }
}

function receiveTokenFailure(reason) {
  return dispatch => {
    dispatch(toggleIsFetching());
    dispatch(unauthUser(reason));
  }
}

export function unauthUser(reason) {
  if(localStorage.getItem('hero-token')) {
    localStorage.removeItem('hero-token');
  }
  return {
    type: UNAUTH_USER,
  }
}

function authUser(user) {
  localStorage.setItem('hero-token', user);
  return {
    type: AUTH_USER,
    payload: user
  }
}
