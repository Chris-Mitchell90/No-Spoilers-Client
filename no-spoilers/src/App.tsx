import React, { createContext, Fragment, useEffect, useState } from 'react';
import './App.css';
import Splash from './components/Splash/Splash';
import Show from './components/Show/Show';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/search/Search';
import GlobalStyles from './theme/global-style';
import Navbar from './components/Navbar/Navbar';
import { bindActionCreators, createStore } from 'redux';
import reducers from './state/reducers';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CurrentShowContextType, ForumContextType } from './proptypes';
import Profile from './components/Profile/Profile';
import { io, Socket } from 'socket.io-client';
import { ChatActionCreators } from './state/action-creators';

const store = createStore(reducers, composeWithDevTools());

export const CurrentShowContext = createContext<CurrentShowContextType>(
  {} as CurrentShowContextType
);

export const ForumContext = createContext<ForumContextType>(
  {} as ForumContextType
);

function App() {
  const {
    setSocketAction,
    addChatAction,
    addMessageAction,
    addShowChatsAction,
  } = bindActionCreators(ChatActionCreators, store.dispatch);

  const receiveNewChatter = (chatter: Chatter) => {
    const chat: Chat = {
      showId: chatter.showId,
      displayName: chatter.displayName,
      avatar: chatter.avatar,
      chatterId: chatter.userId,
      messages: [],
    };

    addChatAction(chat);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocketAction(newSocket);

    newSocket.on('found', (resp) => {
      console.log('someone connected', resp);
      receiveNewChatter(resp);
    });

    newSocket.on('receivemessage', (msg) => {
      console.log('message', msg);
      addMessageAction(msg);
    });

    newSocket.on('subscribed', (payload) => {
      const show = store.getState().user.currentUserTVShowDetail;

      subscribeToTVShowChats(payload, show.TMDB_show_id.toString(), show.name);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const subscribeToTVShowChats = (
    chatters: Array<Chatter>,
    showId: string,
    showName: string
  ) => {
    const tvShowChats: TVShowChats = {
      showId: showId,
      showName: showName,
      chats: chatters.length
        ? chatters.map((chatter) => {
            return {
              chatterId: chatter.userId,
              displayName: chatter.displayName,
              showId: chatter.showId,
              avatar: chatter.avatar,
              messages: [],
            };
          })
        : [],
    };

    addShowChatsAction(tvShowChats);
  };

  return (
    <Provider store={store}>
      <Fragment>
        <GlobalStyles />
        <div className="App">
          <Router>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="show/:id" element={<Show />} />
              <Route path="search" element={<Search />} />
              <Route path="/" element={<Splash />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </div>
      </Fragment>
    </Provider>
  );
}

export default App;
