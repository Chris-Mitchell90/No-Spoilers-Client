import styled from 'styled-components';

const StyledSidebar = styled.nav<Props>`
  background-color: var(--navbar-color);
  width: ${(p) => (p.expanded ? '400px' : '140px')};
  opacity: ${(p) => (p.expanded ? '1' : '0.8')};
  min-height: 100%;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  transition: width 0.4s ease-in-out, opacity 0.4s ease-in-out;

  h1 {
    color: white;
    margin: 0px;
  }

  .top {
    display: flex;
    // gap: 10px;
    padding: 0px 15px;
    height: 60px;
    background-color: var(--);
    // button {
    //   height: 50%;
    // }
    align-items: center;

    Button {
      margin-bottom: 15px;
      color: var(--sharp-purple);
      font-family: var(--main-font);
      background-color: var(--navbar-color);
      padding: 8px;
      border-radius: 8px;
      margin-top: 16px;
      font-size: 20px;
    }

    Button:hover {
      outline: none;
    }
  }

  .mini {
    color: white;
    padding: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--navbar-color);

    .item {
      padding: 12px;
      background-color: black;
      font-family: 'Poppins', sans-serif;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid transparent;
      border-radius: 15px;
      letter-spacing: 1.3px;
    }
    .item:hover {
      box-sizing: border-box;
      border: 1px solid darkgoldenrod;
    }
  }

  .arrow {
    color: white;
    margin-left: auto;
  }

  .chatter-pane {
    width: 308px;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 15px;
    box-shadow: 1px 1px 1px rgba(124, 43, 234, 0.3);
    border: 2px solid transparent;
    cursor: pointer;

    :hover {
      border: 2px solid purple;
    }

    .avatar {
      width: 80px;
      height: 80px;
    }
  }

  .chatter-list {
    width: 308px;
    margin-top: 30px;
    width: 100%;
    padding: 20px;
  }
`;

export default StyledSidebar;

interface Props {
  expanded: boolean;
}
