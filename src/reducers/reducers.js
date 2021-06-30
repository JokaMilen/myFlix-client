import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USERINFO } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userInfo(state = null, action) {
  switch (action.type) {
    case SET_USERINFO:
      return action.value;
    default:
      return state
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userInfo
})

export default moviesApp;