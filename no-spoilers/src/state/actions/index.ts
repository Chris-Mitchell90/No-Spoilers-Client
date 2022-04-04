import {
  openSidebar,
  setCurrentShowChatAction,
} from './../action-creators/chat-action-creators';
import { Socket } from 'socket.io-client';
import { ActionType, ChatActionType } from '../action-types';

/**
 * On Login, all user info and shows
 */
interface SetUserAction {
  type: ActionType.SET_CURRENT_USER;
  payload: User;
}

/**
 * + For updating user info, excluding the shows.
 */

interface UpdateUserAction {
  type: ActionType.UPDATE_USER;
  payload: BasicUserInfo;
}

/**
 * Updating all shows
 */

interface SetUserTVShowsAction {
  type: ActionType.SET_USER_TV_SHOWS;
  payload: UserTVShow[];
}

/**
 * Updating one show
 * + Set is completed
 * + update episode
 */

interface UpdateUserShowAction {
  type: ActionType.UPDATE_USER_SHOW;
  payload: UserTVShow;
}

interface LogoutAction {
  type: ActionType.LOGOUT;
}
interface RemoveUserShowAction {
  type: ActionType.REMOVE_USER_SHOW;
  payload: number | UserTVShow;
}

interface AddUserShowAction {
  type: ActionType.ADD_USER_SHOW;
  payload: UserTVShow;
}

interface ChangeCurrentUserTVDetail {
  type: ActionType.CHANGE_CURRENT_USER_TV_DETAIL;
  payload: TVShow;
}

export type Action =
  | SetUserAction
  | UpdateUserAction
  | SetUserTVShowsAction
  | UpdateUserShowAction
  | LogoutAction
  | RemoveUserShowAction
  | AddUserShowAction
  | ChangeCurrentUserTVDetail;

interface AddShowChatsAction {
  type: ChatActionType.ADD_SHOW_CHATS;
  payload: TVShowChats;
}

interface RemoveShowChatsAction {
  type: ChatActionType.REMOVE_SHOW_CHATS;
  payload: TVShowChats;
}

interface RemoveAllChatsAction {
  type: ChatActionType.REMOVE_ALL;
}

interface SetShowChatsAction {
  type: ChatActionType.SET_SHOW_CHATS;
  payload: Array<TVShowChats>;
}

interface AddMessageAction {
  type: ChatActionType.ADD_MESSAGE;
  payload: Message;
}

interface SetMessagesAction {
  type: ChatActionType.SET_MESSAGES;
  payload: Array<Message>;
}

interface PauseChatsAction {
  type: ChatActionType.PAUSE_CHATS;
}

interface AddChatAction {
  type: ChatActionType.ADD_CHAT;
  payload: Chat;
}

interface RemoveChatAction {
  type: ChatActionType.REMOVE_CHAT;
  payload: Chat;
}

interface SetSocketAction {
  type: ChatActionType.SET_SOCKET;
  payload: Socket;
}

interface OpenSidebarAction {
  type: ChatActionType.OPEN_SIDEBAR;
  payload: number | undefined;
}

interface CloseSidebarAction {
  type: ChatActionType.CLOSE_SIDEBAR;
}

interface SetCurrentShowChatAction {
  type: ChatActionType.SET_CURRENT_SHOW_CHAT;
  payload: TVShowChats;
}
export type ChatAction =
  | AddShowChatsAction
  | RemoveShowChatsAction
  | RemoveAllChatsAction
  | SetShowChatsAction
  | AddMessageAction
  | SetMessagesAction
  | PauseChatsAction
  | AddChatAction
  | RemoveChatAction
  | SetSocketAction
  | OpenSidebarAction
  | CloseSidebarAction
  | SetCurrentShowChatAction;

/* 

const ActionType = {
  SET_CURRENT_USER: "set_user",
  LOGIN: "login",
  LOGOUT: "logout",
  ADD_USER_SHOW: "add_user_show",
  REMOVE_USER_SHOW: "remove_user_show",
  SET_SHOW_COMPLETED: "set-show-completed",
  UPDATE_SHOW_EPISODE: "update_show_episode",
};

*/
