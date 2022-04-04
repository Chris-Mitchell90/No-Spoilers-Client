import styled from 'styled-components';

const StyledForumReplies = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;

  .reply-modal {
    display: flex;
    justify-content: flex-end;
    margin-top: -40px;
  }

  .replies {
    margin-left: 15%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .reply-summary {
    background-color: var(--chatbox-border);
    font-family: var(--main-font);
    color: var(--chatbox-wrd);
  }

  .reply-content {
    background-color: #dee2e7;
  }

  .report-container {
    display: flex;
    justify-content: center;
    width: 10%;
  }

  .report-btn {
    color: red;
  }

  .show-hide-btn {
    padding-top: 5px;
    padding-bottom: 5px;
    border: none;
  }

  .reply-btn {
    border: none;
    color: var(--sharp-purple);
    
  }

  .reply-btn img {
    width: 15px;
  }

  .report-btn img {
    width: 15px;
  }

  .reply-btn:hover {
    border: none;
  }

  .show-hide-btn:hover {
    border: none;
  }


`;

export default StyledForumReplies;
