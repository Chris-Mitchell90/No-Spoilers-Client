import styled from 'styled-components';

const StyledReplyBox = styled.div`
  border-radius: 10px;

  .replier-bar {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .replier-progress {
    padding: 8px 10px;
    border-radius: 10px;
    margin-left: 5px;
  }
  .replier-progress-ahead {
    color: white;
    background-color: darkred;
    height: 18px;
  }
  .replier-progress-same {
    margin-left: -8px;
    color: white;
  }
  .replier-progress-behind {
    color: white;
    background-color: black;
  }

  .user-buttons {
    margin-left: auto;
  }

  .edit {
    display: flex;
    gap: 15px;
    align-items: center;

    button {
      align-self: flex-end;
      border-radius: 10px;
      padding: 8px 12px;
      border: 0;
      min-width: 80px;
      color: white;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
      background-color: black;
    }
  }

  .edit-box {
    font-family: 'Inter', sans-serif;
    resize: none;
    height: 100px;
    width: 300px;
  }

  .reply-summary {
    border-radius: 10px 10px 0 0;
  }

  .reply-content {
    border-radius: 10px 10px 10px 10px;
  }

  #reply-box {
    border-radius: 10px 10px 10px 10px;
  }

  .reply-avatar {
    img {
      width: 100%;
    }
    height: 60px;
    width: 60px;
    margin: 0px 15px;
  }
`;

export default StyledReplyBox;
