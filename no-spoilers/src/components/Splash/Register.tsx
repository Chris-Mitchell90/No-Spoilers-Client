import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import UserAPI from '../../API/user-api';
import { LoginProps } from '../../proptypes';
import { UserActionCreators } from '../../state/action-creators';
import { checkEmail, checkPassword, getRandomString } from './helpers';
import blackLogo from './images/black-logo.png';
import spidermanImage from './images/spiderman.jpeg';
import StyledRegister from './Register.styled';
import Tooltip from '@mui/material/Tooltip';

function Register({ setLoginOrRegister }: LoginProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setUserAction } = bindActionCreators(UserActionCreators, dispatch);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [avatarRegister, setAvatarRegister] = useState<string>('');

  const fetchUser = async (userToSend: DBUser) => {
    const user = await UserAPI.register(userToSend);
    if (user) setUserAction(user);
    navigate('/home');
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      checkEmail(email) &&
      checkPassword(password) &&
      passwordConfirm === password &&
      displayName
    ) {
      fetchUser({
        email,
        password,
        displayName,
        avatar: '',
      });
    }
  };

  return (
    <StyledRegister>
      <div className="spiderman-container">
        <img src={spidermanImage} />
      </div>

      <div className="form-container">
        <form>
          <header>
            <div className="text-container">
              <div className="welcome">Welcome !</div>
              <div className="sign-up-to">Sign up to</div>
              <div>NO SPOILERS!</div>
            </div>

            <div className="blacklogo avatar-container">
              <div className="current-avatar">
                <Tooltip title="CLICK ME!" arrow>
                  <img
                    onClick={(e: SyntheticEvent) => {
                      e.preventDefault();
                      setAvatarRegister(
                        'https://avatars.dicebear.com/api/' + getRandomString()
                      );
                    }}
                    src={
                      avatarRegister ||
                      blackLogo ||
                      'https://avatars.dicebear.com/api/male/1.png'
                    }
                  />
                </Tooltip>
              </div>
            </div>
          </header>

          <section>
            <div className="email">
              <div>Email</div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="new-email"
                placeholder="Enter your email"
              />
            </div>

            <div className="user-name">
              <div>User name</div>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                name="new-user-name"
                placeholder="Enter your user name"
              />
            </div>

            <div className="password">
              <div>Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="new-password"
                placeholder="Enter your password"
              />
            </div>

            <div className="confirm-password">
              <div>Confirm Password</div>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                name="new-confirm-password"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <button type="submit" onClick={onSubmit}>
                Register
              </button>
            </div>
          </section>

          <footer>
            Already have an account?{' '}
            <button
              className="btn-login"
              onClick={() => setLoginOrRegister('login')}
            >
              Log in
            </button>
          </footer>
        </form>
      </div>
    </StyledRegister>
  );
}

export default Register;
