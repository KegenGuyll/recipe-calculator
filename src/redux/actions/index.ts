import * as types from '../constants';

export const SetUserData = (payload: firebase.User) => ({
  type: types.SET_USER_DATA,
  payload,
});
