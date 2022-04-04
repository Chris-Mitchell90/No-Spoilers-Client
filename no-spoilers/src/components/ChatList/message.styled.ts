import styled from 'styled-components';

const StyledMessage = styled.div<Props>`
  margin-top: 10px;
  margin-left: ${(p) => (p.user ? 'auto' : '0px')};
  border: 0.5px solid white;
  background-color: var(--chatbox-border);
  border-radius: 15px;
  padding: 10px 10px;
  border-bottom-left-radius: ${(p) => (p.user ? '15px' : '0px')};
  border-bottom-right-radius: ${(p) => (!p.user ? '15px' : '0px')};
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  white-space: wrap;

  .sender-name {
    font-size: 14px;
    color: var(--chatbox-color);
    text-align: left;
    font-weight: bold;
  }

  .message-content {
    margin-top: 5px;
    text-align: left;
    font-size: 12px;
  }

  .date {
    font-size: 10px;
    min-width: 37px;
    text-align: right;
  }
`;

export default StyledMessage;

interface Props {
  user: boolean;
}
