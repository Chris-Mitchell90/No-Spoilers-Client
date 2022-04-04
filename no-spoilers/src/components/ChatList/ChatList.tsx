import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChatState, MainState } from '../../proptypes';
import { ChatActionCreators } from '../../state/action-creators';
import Chat from './Chat';
import StyledChatList from './chatlist.styled';
import ChatterPane from './ChatterPane';
import { Button } from './ShowMiniButton';

function ChatList() {
  const chat = useSelector<MainState>((state) => state.chat) as ChatState;

  const [shows, setShows] = useState<Array<CurrentShowChats>>(); // Will get this from redux instead of mocks
  const [currentShowChats, setCurrentShowChats] = useState<TVShowChats>(
    {} as TVShowChats
  );
  const [currentChatter, setCurrentChatter] = useState<Chat>();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const dispatch = useDispatch();
  const { setCurrentShowChatAction, openSidebar } = bindActionCreators(
    ChatActionCreators,
    dispatch
  );

  const setChatOpen = (chats: Chat, e: SyntheticEvent) => {
    console.log(e);
    if (isChatOpen) {
      setIsChatOpen(false);
      return;
    }
    setCurrentChatter(chats);
    setIsChatOpen(true);
  };

  const renderList = () => {
    return (
      <div className="chatter-list">
        {chat.currentShowChat.showName &&
          chat.currentShowChat.chats.map((chat, index) => {
            return (
              <ChatterPane key={index} setChatOpen={setChatOpen} chat={chat} />
            );
          })}
      </div>
    );
  };

  const updateShow = (name: string) => {
    const collection = chat.chatsCollection.find(
      (show) => show.showName === name
    );

    if (collection) setCurrentShowChatAction(collection);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const openChatCollection = (collection: TVShowChats) => {
    openSidebar(collection.showId);
  };

  const renderChatBox = () => {
    if (isChatOpen && currentChatter) {
      return (
        <Chat
          toggleChat={toggleChat}
          showName={currentShowChats.showName}
          currentChat={currentChatter}
          isChatOpen={isChatOpen}
        />
      );
    }
  };

  const renderMini = () => {
    return (
      <div className="mini">
        {isChatOpen && currentChatter && (
          <Chat
            toggleChat={toggleChat}
            showName={currentShowChats.showName}
            currentChat={currentChatter}
            isChatOpen={isChatOpen}
          />
        )}
        {chat.chatsCollection.map((collection, index) => {
          return (
            <Button key={index} onClick={() => openChatCollection(collection)}>
              {collection.showName} <br />({collection.chats.length} online)
            </Button>
          );
        })}
      </div>
    );
  };

  return chat.sidebarOpen ? (
    <StyledChatList>
      {renderChatBox()}
      {chat.chatsCollection.length > 0 && (
        <FormControl
          sx={{
            m: 1,
            width: 300,
            backgroundColor: '#c6cbd2',
            borderRadius: '10px',
            boxShadow: '2px 2px 2px rgba(255, 255, 255, 0.4)',
            marginBottom: 5,
          }}
        >
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={chat.currentShowChat.showName || ''}
            onChange={(e) => updateShow(e.target.value as string)}
            input={
              <OutlinedInput
                sx={{
                  color: 'grey',
                  fontSize: 20,
                  letterSpacing: 1,
                  fontWeight: 500,
                }}
                label="Name"
              />
            }
          >
            {chat.chatsCollection.map((chatter, index) => (
              <MenuItem key={index} value={chatter.showName}>
                {chatter.showName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {/* List of chatters connected to that show */}
      {chat.chatsCollection.length > 0 ? (
        <h2>Currently Online:</h2>
      ) : (
        <h2>Add from the Show Page!</h2>
      )}
      {chat.currentShowChat && renderList()}
    </StyledChatList>
  ) : (
    renderMini()
  );
}

export default ChatList;
