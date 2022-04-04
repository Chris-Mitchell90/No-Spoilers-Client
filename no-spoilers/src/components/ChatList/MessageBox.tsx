import React from 'react';
import { useSelector } from 'react-redux';
import { MainState } from '../../proptypes';
import { prettifyDate } from './helpers';
import StyledMessage from './message.styled';

const MessageBox = ({ message }: { message: Message }) => {
  const user = useSelector<MainState>((state) => state.user.user) as User;

  return (
    <StyledMessage user={message.senderId === user._id.toString()}>
      <div className="sender-name">{message.displayName}</div>
      <div className="message-content">{message.message}</div>
      <div className="date">
        {message.date && prettifyDate(new Date(message.date))}
      </div>
    </StyledMessage>
  );
};

export default MessageBox;
