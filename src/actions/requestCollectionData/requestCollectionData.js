import axios from 'axios';

import { API_ROUTE_BASE } from '../../api-routes';
import { toggleIsFetching } from '../toggleIsFetching/toggleIsFetching';
import { apiError } from '../apiError/apiError';

import {
  RECEIVE_USERS,
  RECEIVE_EMPLOYEES,
  RECEIVE_TRANSACTIONS,
  RECEIVE_FILTERED_RESULTS,
} from '../types';

export function requestCollectionData(collection, filter, param) {
  return dispatch => {
    dispatch(toggleIsFetching());
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('hero-token');
    let requestUrl = API_ROUTE_BASE.concat(collection, '/', filter);
    if (param) {
      requestUrl += '/' + param;
    }
    return axios.get(requestUrl)
      .then(res => dispatch(receiveCollectionDataSuccess(collection, filter, res.data)))
      .catch(err => {
        console.log('error?', err);
        // dispatch(toggleIsFetching());
        return dispatch(apiError(err.message));
      });
  }
}

function receiveCollectionDataSuccess(collection, filter, payload) {
  return dispatch => {
    // if (payload.error !== null) {
    //   console.log('payload error!', payload.error);
    //   // dispatch(toggleIsFetching());
    //   return dispatch(toggleIsFetching());
    // }
    switch(collection) {
      case 'employees':
        return dispatch(fetchEmployeesSuccess(filter, payload));
      case 'transactions':
        return dispatch(fetchTransactionsSuccess(filter, payload));
      case 'users':
        return dispatch(fetchUsersSuccess(filter, payload));
      default:
        return dispatch(apiError('Unknown category, report a bug!'));
    }
  }
}

function fetchEmployeesSuccess(filter, payload) {
  return dispatch => {
    dispatch(toggleIsFetching());
    if (filter === 'all') {
      return dispatch({ type: RECEIVE_EMPLOYEES, payload });
    }
    else {
      return dispatch({ type: RECEIVE_FILTERED_RESULTS, payload });
    }
  }
}

function fetchTransactionsSuccess(filter, payload) {
  return dispatch => {
    dispatch(toggleIsFetching());
    if (filter === 'all') {
      return dispatch({ type: RECEIVE_TRANSACTIONS, payload });
    }
    else {
      return dispatch({ type: RECEIVE_FILTERED_RESULTS, payload });
    }
  }
}

function fetchUsersSuccess(filter, payload) {
  return dispatch => {
    dispatch(toggleIsFetching());
    if (filter === 'all') {
      return dispatch({ type: RECEIVE_USERS, payload });
    }
    else {
      return dispatch({ type: RECEIVE_FILTERED_RESULTS, payload });
    }
  }
}
