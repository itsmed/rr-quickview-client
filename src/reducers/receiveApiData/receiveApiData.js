import {
  RECEIVE_USERS,
  RECEIVE_EMPLOYEES,
  RECEIVE_TRANSACTIONS,
  RECEIVE_FILTERED_RESULTS,
} from '../../actions/types';

export function receiveApiData(state = {
  employees: [],
  transactions: [],
  users: [],
  filteredResults: []
}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        users: action.payload
      });
    case RECEIVE_EMPLOYEES:
      return Object.assign({}, state, {
        employees: action.payload
      });
    case RECEIVE_TRANSACTIONS:
      return Object.assign({}, state, {
        transactions: action.payload
      });
    case RECEIVE_FILTERED_RESULTS:
      return Object.assign({}, state, {
        filteredResults: action.payload
      });
    default:
      return state;
  }
}