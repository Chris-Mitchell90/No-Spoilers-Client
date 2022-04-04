import styled from 'styled-components';

const StyledAvatarReel = styled.div`
  color: white;
  display: flex;
  width: 300px;
  overflow-y: hidden;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex-wrap: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }

  .avatar-container-internal {
    padding: 0;
    width: 70px;
    margin: 3px;
  }

  img {
    width: 70px;
    cursor: pointer;
  }

  img:hover {
    width: 80px;
    transition: 1s;
  }
`;

export default StyledAvatarReel;
