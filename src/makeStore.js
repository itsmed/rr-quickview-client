
import axios from 'axios';
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';



const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_USER = 'AUTH_USER';

function toggleIsFetching() {
  return {
    type: TOGGLE_IS_FETCHING,
  };
}

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
    dispatch(unauthUser(reason));
    dispatch(toggleIsFetching());
  }
}

export function unauthUser(reason) {
  // figure out how to navigate 
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


function isFetching(state = false, action) {
  if (action.type === TOGGLE_IS_FETCHING) {
    return !state.isFetching;
  } else {
    return state;
  }
}

function authReducer(state = { isAuth: false, user: null }, action) {
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

const rootReducer = combineReducers({
  auth: authReducer,
  isFetching,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
);

export default store;