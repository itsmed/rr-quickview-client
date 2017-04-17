import axios from 'axios';

import { TestApiRouteBase } from '../../api-routes';
import {
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_SUCCESS,
} from '../types';

export function getToken(username, password) {
  return dispatch => {
    disptach(makeTokenRequest());

    return axios.get(TestApiRouteBase.concat('auth/signin'))
      .then(res => dispatch(receiveTokenSuccess(res)))
      .catch(err => dispatch(receiveTokenFailure(err)));
  }
}

function makeTokenRequest() {
  return {
    type: FETCH_TOKEN_REQUEST,
  };
}

function receiveTokenSuccess(response) {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload: response.data.token
  };
}

function receiveTokenFailure(response) {
  return {
    type: FETCH_TOKEN_FAILURE,
    payload: response.data.error
  };
}
