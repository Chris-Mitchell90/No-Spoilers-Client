import styled from 'styled-components';

const StyledLogin = styled.div`
  background-color: var(--bg-color);
  display: flex;
  justify-content: space-evenly;

  .spiderman-container img {
    width: 600px;
    margin: 2%;
    padding-top: 5%;
  }

  .form-container {
    background-color: white;
    border-radius: 2%;
    margin: 2%;
    width: 25%;
    padding: 1%;
  }

  header {
    display: flex;
    justify-content: space-between;
  }

  .blacklogo img {
    width: 175px;
    // padding-top: 5%;
    padding-top: 5px;
    padding-right: 40px;
  }

  header .text-container {
    padding-top: 16px;
  }

  .welcome {
    font-size: 32px;
  }

  .sign-in-to {
    font-weight: 400;
    margin-top: 50px;
    font-size: 30px;
    margin-bottom: 3%;
  }

  section {
    margin: 5% auto;
    margin-top: 50px;
  }

  section .user-name {
    padding-bottom: 5%;
  }

  section .user-name input {
    margin-top: 2%;
    width: 90%;
    padding: 20px;
  }

  section .password input {
    margin-top: 2%;
    width: 90%;
    padding: 20px;
  }

  section button {
    margin-top: 10%;
    width: 100%;
    border: none;
    background-color: black;
    color: white;
    padding: 20px;
    cursor: pointer;
  }

  .btn-register {
    border: none;
    background-color: white;
    font-weight: 900;
    cursor: pointer;
  }

  
  footer {
    text-align: center;
    margin-top: 30%;
  }
`;

export { StyledLogin };
