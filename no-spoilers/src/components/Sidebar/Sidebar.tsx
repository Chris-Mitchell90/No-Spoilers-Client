import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChatState, MainState } from '../../proptypes';
import { ChatActionCreators } from '../../state/action-creators';
import ChatList from '../ChatList/ChatList';
import StyledSidebar from './sidebar.styled';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Sidebar() {
  const chat = useSelector<MainState>((state) => state.chat) as ChatState;
  const dispatch = useDispatch();
  const { openSidebar, closeSidebar } = bindActionCreators(
    ChatActionCreators,
    dispatch
  );

  const toggleExpanded = () => {
    console.log(chat.sidebarOpen);
    !chat.sidebarOpen ? openSidebar(undefined) : closeSidebar();
  };

  return (
    <StyledSidebar expanded={chat.sidebarOpen}>
      <div className="top">
        <h1>Chats</h1>
        {/* <Button onClick={() => toggleExpanded()}>&gt;&gt;&gt;</Button> */}
        {chat.sidebarOpen ? (
          <ArrowBackIcon className="arrow" onClick={() => toggleExpanded()} />
        ) : (
          <ArrowForwardIcon
            className="arrow"
            onClick={() => toggleExpanded()}
          />
        )}
      </div>
      <ChatList />
    </StyledSidebar>
  );
}

export default Sidebar;

function MiniChatList() {
  const chat = useSelector<MainState>((state) => state.chat) as ChatState;
  const dispatch = useDispatch();
  const { openSidebar, closeSidebar } = bindActionCreators(
    ChatActionCreators,
    dispatch
  );

  const openChatCollection = (collection: TVShowChats) => {
    openSidebar(collection.showId);
  };

  return (
    <div className="mini">
      {chat.chatsCollection.map((collection, index) => {
        return (
          <div
            key={index}
            className="item"
            onClick={() => openChatCollection(collection)}
          >
            {collection.showName} ({collection.chats.length})
          </div>
        );
      })}
    </div>
  );
}
