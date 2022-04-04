import styled from 'styled-components';

const StyledNavbar = styled.nav`
  background-color: var(--navbar-color);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: black;

  button {
    border: 1px solid #6f6f6f;
    color: #6f6f6f;
    background-color: var(--bg-color);
    border-radius: 25px;
    padding: 8px 20px;
    width: fit-content;
    color: white;
    cursor: pointer;
  }
  .links {
    display: flex;
    gap: 10px;
    margin: 10px;
  }
`;

export default StyledNavbar;
