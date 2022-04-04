import styled from 'styled-components';

const StyledProfile = styled.div`
  color: white;

  .profile-layout {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    height: 90vh;
  }

  .avatar-container {
    display: flex;
    display: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
    padding-top: 200px;
  }

  .current-avatar {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .current-avatar img {
    width: 100%;
  }

  .input-container {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .heading-row {
    font-size: 40px;
    line-height: 60px;
    font-weight: 300;
    padding-left: 13%;
    flex: 2;
  }

  .name-email-row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 2;
  }

  .pwd-row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 2;
  }

  .save-change {
    background-color: #4a5568;
    font-family: var(--main-font);
    border: none;
    border-radius: 5px;
    color: white;
    padding: 15px 70px;
  }

  .save-change:hover {
    cursor: pointer;
    outline: none;
    padding: 14px 69px;
    border: 1px solid var(--light-purple);
  }

  .btn-row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 10px;
    flex: 2;
  }

  input {
    border-radius: 10px;
    outline: none;
    border-color: transparent;
    width: 367px;
    margin-top: 20px;
    padding: 15px 10px;
  }

  .input-area:focus {
    border: 2px solid var(--sharp-purple);
  }
`;

export default StyledProfile;
