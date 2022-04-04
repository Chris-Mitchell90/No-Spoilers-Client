export enum ActionType {
  SET_CURRENT_USER = 'set_user',
  UPDATE_USER = 'update_user',
  SET_USER_TV_SHOWS = 'set_user_shows',
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE_USER_SHOW = 'update_user_show',
  ADD_USER_SHOW = 'add_user_show',
  REMOVE_USER_SHOW = 'remove_user_show',
  UPDATE_SHOW_EPISODE = 'update_show_episode',
  CHANGE_CURRENT_USER_TV_DETAIL = 'change_current_user_tv_detail',
}

export enum ChatActionType {
  SET_CURRENT_SHOW_CHAT = 'set_current_show_chat',
  ADD_SHOW_CHATS = 'add_show_chats',
  REMOVE_SHOW_CHATS = 'remove_chatter',
  SET_SHOW_CHATS = 'set_show_chats',
  PAUSE_CHATS = 'pause_chats',
  ADD_MESSAGE = 'add_message',
  SET_MESSAGES = 'set_messages',
  REMOVE_ALL = 'remove_all',
  ADD_CHAT = 'add_chat',
  REMOVE_CHAT = 'remove_chat',
  SET_CHATS = 'set_chats',
  SET_SOCKET = 'set_socket',
  OPEN_SIDEBAR = 'open_sidebar',
  CLOSE_SIDEBAR = 'close_sidebar',
}
