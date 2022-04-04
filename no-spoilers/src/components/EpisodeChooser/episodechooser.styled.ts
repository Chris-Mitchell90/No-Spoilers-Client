import styled from 'styled-components';

const StyledEpisodeChooser = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 70%;
  height: 600px;
  background-color: var(--navbar-color);
  margin: 0 auto;
  user-select: none;
  font-family: 'Barlow', sans-serif;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    overflow-x: auto;
    border-radius: 10px;
    ::-webkit-scrollbar {
      width: 20px;
    }

    ::-webkit-scrollbar-track {
      background-color: #d4d4d8;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #1f2937;
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
    }
    li {
      border-radius: 18px 18px 0px 0px;
      position: relative;
      flex-grow: 1;
      width: auto;
      padding: 10px 15px;
      padding-bottom: 15px;
      margin: 0;
      text-align: center;
      font-size: 20px;
      color: #374151;
      min-width: 100px;
      font-weight: 600;
    }

    li::after {
      content: '';
    }
  }

  .main {
    height: 100%;
    width: 100%;
    background-color: var(--navbar-color);
    overflow-y: none;
    overflow-x: auto;
    border-radius: 0 0 10px 10px;
    ::-webkit-scrollbar {
      width: 20px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #1f2937;
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
    }
  }

  .episodes {
    padding: 20px 40px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    width: 730px;
  }
  .episode {
    color: white;
    padding: 22px;
    border-radius: 10px;
    min-width: fit-content;
    max-width: 130px;
    min-width: 130px;
    text-align: center;
    box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.3);
    font-size: 22px;
    letter-spacing: 1px;
    transition: transform 0.5s;
    cursor: pointer;
    span {
      font-size: 10px;
    }
  }

  .episode:hover {
    transform: scale(1.05);
    background-color: '#84cc16';
  }

  h1 {
    margin: 10px 20px;
    width: fit-content;
    font-weight: 500;
  }
`;

export default StyledEpisodeChooser;
