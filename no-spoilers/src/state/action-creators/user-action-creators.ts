import { Socket } from 'socket.io-client';
import { ActionType } from '../action-types';

export const setUserAction = (payload: User) => {
  return {
    type: ActionType.SET_CURRENT_USER,
    payload,
  };
};
export const updateUserAction = (payload: User) => {
  return {
    type: ActionType.UPDATE_USER,
    payload,
  };
};
export const setUserTVShowsAction = (payload: UserTVShow[]) => {
  return {
    type: ActionType.SET_USER_TV_SHOWS,
    payload,
  };
};

export const logoutAction = () => {
  return {
    type: ActionType.LOGOUT,
  };
};

export const updateUserShowAction = (payload: UserTVShow) => {
  return {
    type: ActionType.UPDATE_USER_SHOW,
    payload,
  };
};

export const addUserShowAction = (payload: UserTVShow) => {
  return {
    type: ActionType.ADD_USER_SHOW,
    payload,
  };
};

export const removeUserShowAction = (payload: number) => {
  return {
    type: ActionType.REMOVE_USER_SHOW,
    payload,
  };
};

export const changeCurrentUserTVDetailAction = (payload: TVShow) => {
  return {
    type: ActionType.CHANGE_CURRENT_USER_TV_DETAIL,
    payload,
  };
};
