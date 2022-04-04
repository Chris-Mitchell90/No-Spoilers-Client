import { Socket } from 'socket.io-client';
import { ChatActionType } from '../action-types';

export const addShowChatsAction = (tvShowChats: TVShowChats) => {
  return {
    type: ChatActionType.ADD_SHOW_CHATS,
    payload: tvShowChats,
  };
};

export const removeShowChatsAction = (tvShowChats: TVShowChats) => {
  return {
    type: ChatActionType.REMOVE_SHOW_CHATS,
    payload: tvShowChats,
  };
};

export const removeAllChatsAction = () => {
  return {
    type: ChatActionType.REMOVE_ALL,
  };
};

export const setShowChatsAction = (chatsCollection: Array<TVShowChats>) => {
  return {
    type: ChatActionType.SET_SHOW_CHATS,
    payload: chatsCollection,
  };
};

export const addMessageAction = (message: Message) => {
  return {
    type: ChatActionType.ADD_MESSAGE,
    payload: message,
  };
};

export const setMessagesAction = (messages: Array<Message>) => {
  return {
    type: ChatActionType.SET_MESSAGES,
    payload: messages,
  };
};

export const pauseChatsAction = () => {
  return {
    type: ChatActionType.PAUSE_CHATS,
  };
};

export const addChatAction = (chat: Chat) => {
  return {
    type: ChatActionType.ADD_CHAT,
    payload: chat,
  };
};

export const removeChatAction = (chat: Chat) => {
  return {
    type: ChatActionType.REMOVE_CHAT,
    payload: chat,
  };
};

export const setSocketAction = (socket: Socket) => {
  return {
    type: ChatActionType.SET_SOCKET,
    payload: socket,
  };
};

export const openSidebar = (showId: string | undefined) => {
  return {
    type: ChatActionType.OPEN_SIDEBAR,
    payload: showId,
  };
};

export const closeSidebar = () => {
  return {
    type: ChatActionType.CLOSE_SIDEBAR,
  };
};

export const setCurrentShowChatAction = (showChat: TVShowChats) => {
  return {
    type: ChatActionType.SET_CURRENT_SHOW_CHAT,
    payload: showChat,
  };
};
