export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERINFO = 'SET_USERINFO';
export const SET_TOKEN = 'SET_TOKEN';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function setUserInfo(value) {
  return {
    type: SET_USERINFO,
    value
  };
}

export function setToken(value) {
  return {
    type: SET_TOKEN,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}
