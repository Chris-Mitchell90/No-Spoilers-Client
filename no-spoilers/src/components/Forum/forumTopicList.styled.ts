import styled from 'styled-components';
const StyledForumTopicList = styled.div`
  display: flex;
  font-family: var(--main-font);
  color: var(--chatlist-wrd);
  margin: 25px 80px;
  padding-bottom: 45px;
  flex-direction: column;
  gap: 30px;

  .score {
    color: #6030d0;
    font-family: var(--score-font);
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  .up {
    width: 0;
    height: 0;
    padding: 0;
    border-left: 25px solid var(--bg-color);
    border-right: 25px solid var(--bg-color);
    border-bottom: 25px solid #5d5fef;
    cursor: pointer;
    border-top-width: 0px;
  }

  .down {
    width: 0;
    height: 0;
    padding: 0;
    border-left: 25px solid var(--bg-color);
    border-right: 25px solid var(--bg-color);
    border-top: 25px solid #5d5fef;
    cursor: pointer;
    border-bottom-width: 0px;
  }

  .number {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .text-container {
    display: flex;
    align-items: stretch;
    width: 100%;
  }

  .topic-header {
    background-color: #4a5568;
    /* padding: 15px 15px 15px; */
    width: 100%;
  }

  .bottom-half {
    display: flex;
    background-color: #2d3748;
    padding: 10px;
  }

  .avatar {
    width: 50%;
  }

  .user-info {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .author-name {
      font-size: 26px;
      letter-spacing: 1.3px;
      margin-bottom: 5px;
    }
  }

  .topic-content {
    flex: 7;
    padding: 10px;
    display: flex;
    flex-direction: column;
    line-height: 25px;
  }

  .button-cluster {
    flex: 1;
  }

  .topic-content > button {
    margin-left: 90%;
    margin-top: 16px;
    background-color: var(--chatbox-color);
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

export default StyledForumTopicList;
