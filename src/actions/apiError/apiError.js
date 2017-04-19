import { API_ERROR } from '../types';

import { toggleIsFetching } from '../toggleIsFetching/toggleIsFetching';

export function apiError(message) {
  return dispatch => {
    dispatch(toggleIsFetching());
    
    return dispatch({
      type: API_ERROR,
      payload: message
    });
  }
}