import styled from 'styled-components';

const StyledShow = styled.div`
  color: white;
  margin-left: 140px;

  .show-view {
    display: flex;
    justify-content: space-between;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    margin-left: 10%;
    margin-right: 10%;
  }

  .request-button {
    background: rgba(39, 128, 54, 1);
    border: none;
    border-radius: 10px;
    padding: 20px;
    width: 300px;
    font-size: 24px;
    color: white;
    letter-spacing: 1.5px;
    margin-top: 50px;
    border: 1px solid transparent;

    :hover {
    }
  }

  .show-details {
    text-align: left;
    p {
      margin-top: 30px;
      span {
        font-weight: bold;
      }
    }
  }

  .tagline {
    text-align: right;
    font-style: italic;
    text-transform: uppercase;
  }

  .button-container {
    text-align: center;
  }

  .image-button-container img {
    width: 300px;
  }

  .button-container Button {
    color: white;
    font-family: var(--main-font);
    background-color: var(--navbar-color);
    padding: 8px;
    border-radius: 8px;
    margin-top: 16px;
  }

  .button-container Button:hover {
    border: 1px solid var(--sharp-purple);
    margin-top: 16px;
    padding: 7px;
    outline: none;
  }

  .progress {
    background-color: #1b2530;
    border-radius: 10px;
    padding: 15px;
    text-align: center;

    p {
      margin: 0;
      padding-top: 15px;
    }

    h3 {
      margin: 0;
      padding-top: 10px;
    }

    h4 {
      margin: 0;
      font-size: 22px;
      margin-bottom: 10px;
    }
  }
  .show-description {
    text-align: center;
  }
`;

export default StyledShow;

export const spinnerStyle = {
  position: 'absolute' as 'absolute' | 'relative' | 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

export const coverStyle = {
  position: 'absolute' as 'absolute' | 'relative' | 'fixed',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 40,
};

export const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
