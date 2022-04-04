import styled from 'styled-components';

const StyledBackInTime = styled.div`
  // border: 2px solid red;
  width: 20%;

  .dropbtn {
    background: linear-gradient(to right, #363839, #3b3d3f);
    width: 100%;
    color: white;
    padding: 16px;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .dropdown img {
    width: 5%;
  }

  .dropdown-content {
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    max-height: 440px;
    min-width: 160px;
    z-index: 1;
    margin-top: 15px;

    // display: none;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .dropdown-content::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .example {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .dropdown-content a {
    border: 2px solid grey;
    color: white;
    background-image: linear-gradient(#3a3c3e, #4d4f51);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    margin-top: 3px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border: 2px solid grey;
    color: white;
    background-image: linear-gradient(#3a3c3e, #4d4f51);
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    margin-top: 3px;
    width: 90.5%;
  }

  input {
    border: none;
    background-color: transparent;
    color: white;
    width: 100%;
    padding-top: 10px;
  }

  input: focus {
    outline: none;
  }

  form button {
    border: 2px solid grey;
    border-radius: 5px;
    background: transparent;
    margin-top: 15px;
    color: white;
    cursor: pointer;
  }

  .dropdown-content a:hover {
    border: 2px solid black;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;

export default StyledBackInTime;
