import React, { SyntheticEvent } from 'react';

const ChatterPane = ({
  chat,
  setChatOpen,
}: {
  chat: Chat;
  setChatOpen: (chats: Chat, e: SyntheticEvent) => void;
}) => {
  return (
    <div className="chatter-pane" onClick={(e) => setChatOpen(chat, e)}>
      <img
        src={`https://avatars.dicebear.com/api/${chat.avatar}`}
        className="avatar"
      />
      <h2>{chat.displayName}</h2>
    </div>
  );
};

export default ChatterPane;
