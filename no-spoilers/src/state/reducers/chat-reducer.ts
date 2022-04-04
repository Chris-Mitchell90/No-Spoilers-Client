import { ChatActionType } from './../action-types';
import { ChatAction } from './../actions/index';
import { Socket } from 'socket.io-client';
import { ChatState } from '../../proptypes';

const defaultState = {
  isPaused: false,
  socket: {} as Socket,
  chatsCollection: [],
  sidebarOpen: false,
  currentShowChat: {} as TVShowChats,
};

const chatReducer = (state: ChatState = defaultState, action: ChatAction) => {
  switch (action.type) {
    case ChatActionType.ADD_SHOW_CHATS: {
      const newState = { ...state };
      if (
        newState.chatsCollection.findIndex(
          (coll) => coll.showId === action.payload.showId
        ) === -1
      ) {
        newState.chatsCollection.push(action.payload);
      }
      return newState;
    }

    case ChatActionType.SET_SHOW_CHATS: {
      const newState = { ...state };
      newState.chatsCollection = action.payload;
      return newState;
    }

    case ChatActionType.REMOVE_SHOW_CHATS: {
      const newState = { ...state };
      const index = newState.chatsCollection.findIndex(
        (show) => action.payload.showId === show.showId
      );
      newState.chatsCollection.splice(index, 1);
      return newState;
    }

    case ChatActionType.REMOVE_ALL: {
      const newState = { ...state };
      newState.chatsCollection = [];
      return newState;
    }

    case ChatActionType.ADD_MESSAGE: {
      const newState = { ...state };
      console.log('payload', action.payload);
      console.log('chatsCollection', newState.chatsCollection);
      const show = newState.chatsCollection.find(
        (show) => show.showId.toString() === action.payload.showId.toString()
      ) as TVShowChats;
      console.log('show', show);
      const chatter = show?.chats.find(
        (chat) =>
          chat.chatterId === action.payload.senderId.toString() ||
          chat.chatterId === action.payload.receiverId
      ) as Chat;
      chatter.messages.push(action.payload);
      return newState;
    }

    case ChatActionType.SET_MESSAGES: {
      const newState = { ...state };
      const show = newState.chatsCollection.find(
        (show) => show.showId === action.payload[0].showId
      ) as TVShowChats;
      const chatter = show?.chats.find(
        (chat) => chat.chatterId === action.payload[0].senderId
      ) as Chat;
      chatter.messages = action.payload;
      return newState;
    }

    case ChatActionType.ADD_CHAT: {
      const newState = { ...state };
      console.log(newState.chatsCollection);
      console.log(action.payload.showId);
      const show = newState.chatsCollection.find(
        (show) => show.showId === action.payload.showId.toString()
      ) as TVShowChats;
      show.chats.push(action.payload);
      return newState;
    }

    case ChatActionType.REMOVE_CHAT: {
      const newState = { ...state };
      const show = newState.chatsCollection.find(
        (show) => show.showId === action.payload.showId
      ) as TVShowChats;
      const index = show?.chats.findIndex(
        (chat) => chat.chatterId === action.payload.chatterId
      );

      show.chats.splice(index, 1);
      return newState;
    }

    case ChatActionType.SET_SOCKET: {
      const newState = { ...state };
      newState.socket = action.payload;
      return newState;
    }
    case ChatActionType.OPEN_SIDEBAR: {
      const newState = { ...state };
      newState.sidebarOpen = true;
      if (action.payload) {
        const chat = newState.chatsCollection.find(
          (show) => show.showId === (action.payload as number).toString()
        ) as TVShowChats;
        newState.currentShowChat = chat;
      }
      return newState;
    }
    case ChatActionType.CLOSE_SIDEBAR: {
      const newState = { ...state };
      newState.sidebarOpen = false;
      return newState;
    }
    case ChatActionType.SET_CURRENT_SHOW_CHAT: {
      const newState = { ...state };
      newState.currentShowChat = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default chatReducer;
