import { UserState } from '../../proptypes';
import { ActionType } from '../action-types';
import { Action } from '../actions';

const defaultState: UserState = {
  isLoggedIn: true,
  user: {},
  currentUserTVShowDetail: {} as TVShow,
};

const userReducer = (state = defaultState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_USER: {
      const newState = { ...state };
      newState.user = action.payload;
      newState.isLoggedIn = true;
      return newState;
    }
    case ActionType.LOGOUT: {
      const newState = { ...state };
      newState.user = {};
      newState.isLoggedIn = false;
      localStorage.removeItem('token');
      return newState;
    }
    case ActionType.UPDATE_USER: {
      const newState = { ...state };
      newState.user = action.payload;
      return newState;
    }
    case ActionType.SET_USER_TV_SHOWS: {
      const newState = { ...state };
      (newState.user as User).userTVInfo = action.payload;
      return newState;
    }
    case ActionType.ADD_USER_SHOW: {
      const newState = { ...state };
      (newState.user as User).userTVInfo.push(action.payload);
      return newState;
    }
    case ActionType.REMOVE_USER_SHOW: {
      const newState = { ...state };
      const arr = (newState.user as User).userTVInfo;
      (newState.user as User).userTVInfo.splice(
        findTVShowIndex(arr, action.payload)
      );
      console.log('does it? ', newState === state);

      return newState;
    }
    case ActionType.UPDATE_USER_SHOW: {
      const newState = { ...state };
      const arr = (newState.user as User).userTVInfo;
      (newState.user as User).userTVInfo[findTVShowIndex(arr, action.payload)] =
        action.payload;
      return newState;
    }
    case ActionType.CHANGE_CURRENT_USER_TV_DETAIL: {
      const newState = { ...state };
      newState.currentUserTVShowDetail = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

const findTVShowIndex = (
  arr: Array<UserTVShow>,
  payload: number | UserTVShow
) => {
  const isUsingID = typeof payload === 'number';
  return arr.findIndex((show) => {
    return isUsingID
      ? show.TMDB_show_id === payload
      : show.TMDB_show_id === (payload as UserTVShow).TMDB_show_id;
  });
};

export default userReducer;
