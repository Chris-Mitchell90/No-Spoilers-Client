import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { MainState, NavbarProps } from '../../proptypes';
import { UserActionCreators } from '../../state/action-creators';
import QuickSearch from '../QuickSearch/quick-search';
import StyledNavbar from './navbar.styled';

function Navbar({ showSearch }: NavbarProps) {
  const state = useSelector<MainState>((state) => state) as MainState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { logoutAction } = bindActionCreators(UserActionCreators, dispatch);

  const logout = () => {
    logoutAction();
    navigate('/');
  };

  return (
    <StyledNavbar>
      <div className="links">
        <button
          onClick={() => {
            navigate('/home');
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate('/profile');
          }}
        >
          Profile
        </button>
        <Link to="/">
          <button onClick={logout}>Logout</button>
        </Link>
      </div>
      <h2 style={{ color: 'white', marginRight: '20px' }}>
        {(state.user.user as User).displayName}
      </h2>
      {showSearch && <QuickSearch />}
    </StyledNavbar>
  );
}

export default Navbar;
