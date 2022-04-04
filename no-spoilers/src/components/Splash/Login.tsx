import React, {
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import blackLogo from './images/black-logo.png';
import { StyledLogin } from './Login.styled';
import spidermanImage from './images/spiderman.png';
import { LoginProps, MainState } from '../../proptypes';
import UserAPI, { loginUser } from '../../API/user-api';
import { UserActionCreators } from '../../state/action-creators';
import { checkEmail, checkPassword } from './helpers';
import { verifyTokenAndLogin } from '../../API/user-api';
import { setAuthHeader } from '../../API/api-client';

function Login({ setLoginOrRegister }: LoginProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setUserAction } = bindActionCreators(UserActionCreators, dispatch);
  const state = useSelector<MainState>((state) => state) as MainState;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState<boolean>(false);

  useLayoutEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await verifyTokenAndLogin(token);
        if (response.status === 200) {
          setRedirect(true);
          setUserAction(response.data);
          setAuthHeader(token);
        }
      }
    };
    verify();
  }, []);

  useLayoutEffect(() => {
    if (state.user.isLoggedIn && redirect) {
      navigate('/home');
    }
  }, [state]);

  const fetchUser = async (
    userToSend: Omit<DBUser, 'displayName' | 'avatar'>
  ) => {
    const user = await UserAPI.login(userToSend);
    setUserAction(user);
    localStorage.setItem('token', user.token);
    navigate('/home');
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (checkEmail(email) && checkPassword(password)) {
      fetchUser({
        email,
        password,
      });
    }
  };

  return (
    <StyledLogin>
      <div className="spiderman-container">
        <img src={spidermanImage} />
      </div>

      <div className="form-container">
        <form>
          <header>
            <div className="text-container">
              <div className="welcome">Welcome !</div>
              <div className="sign-in-to">Sign in to</div>
              <div>NO SPOILERS!</div>
            </div>

            <div className="blacklogo">
              <img src={blackLogo} />
            </div>
          </header>

          <section>
            <div className="user-name">
              <div>User name</div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="user-name"
                placeholder="Enter your user name"
                required
              />
            </div>

            <div className="password">
              <div>Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <button type="submit" onClick={onSubmit}>
                Login
              </button>
            </div>
          </section>

          <footer>
            Do not have a No Spoilers Account?
            <button
              className="btn-register"
              onClick={() => setLoginOrRegister('register')}
            >
              Register
            </button>
          </footer>
        </form>
      </div>
    </StyledLogin>
  );
}

export default Login;
