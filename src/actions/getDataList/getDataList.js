import axios from 'axios';

import {
  toggleIsFetching
} from '../toggleIsFetching/toggleIsFetching';

import {
  RECEIVE_ALL_USERS_SUCCESS,
  RECEIVE_ALL_USERS_FAILURE,
} from '../types';

import { TestApiRouteBase } from '../../api-routes';

let token = localStorage.getItem('hero-token');
axios.defaults.headers.common['Authorization'] = token;

export function getDataList(category) {
  return dispatch => {
    dispatch(toggleIsFetching());
    return axios.get(TestApiRouteBase.concat(category, '/all'))
      .then(res => dispatch(receiveAllUsersSuccess(res.data)))
      .catch(err => dispatch(receiveAllUsersFailure(err.data)));
  }
}

function receiveAllUsersSuccess(users) {
  return dispatch => {
    dispatch(toggleIsFetching());
    return dispatch({
      type: RECEIVE_ALL_USERS_SUCCESS,
      payload: users
    });
  }
}

function receiveAllUsersFailure(reason) {
  return dispatch => {
    dispatch(toggleIsFetching());
    return dispatch({
      type: RECEIVE_ALL_USERS_FAILURE,
      payload: reason
    });
  }
}
