import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserAPI from '../../API/user-api';
import { MainState } from '../../proptypes';
import { UserActionCreators } from '../../state/action-creators';
import Navbar from '../Navbar/Navbar';
import AvatarReel from './AvatarReel';
import StyledProfile from './profile.styled';
import Sidebar from '../Sidebar/Sidebar';
import { getRandomString } from '../Splash/helpers';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector<MainState>((state) => state.user.user) as User;
  const { updateUserAction } = bindActionCreators(UserActionCreators, dispatch);

  const [userName, setUserName] = useState<string>(user.displayName);
  const [email, setEmail] = useState<string>(user.email);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVerify, setPasswordVerify] = useState<string>('');
  const [buttonActive, setButtonActive] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<'Save Changes' | 'Saved'>(
    'Save Changes'
  );

  const [avatar, setAvatar] = useState<string>(user.avatar);

  const updateAvatar = async () => {
    const response = await UserAPI.updateAvatar(avatar);

    if (response) {
      const newUser: User = {
        userTVInfo: user.userTVInfo,
        ...response,
      };
      updateUserAction(newUser);
    }
  };

  const updateUser = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email === user.email && userName === user.displayName) {
      if (avatar !== user.avatar) updateAvatar();
      setButtonActive(false);
      setButtonText('Saved');
      return;
    }
  };

  const changeHandler = (
    field: 'username' | 'password' | 'verifypassword' | 'avatar' | 'email',
    value: string
  ) => {
    setButtonActive(true);
    setButtonText('Save Changes');

    switch (field) {
      case 'username':
        setUserName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'verifypassword':
        setPasswordVerify(value);
        break;
      case 'avatar':
        setAvatar(value);
        break;
      case 'email':
        setEmail(value);
        break;
    }
  };

  return (
    <StyledProfile>
      {false && <Sidebar />}
      <Navbar showSearch={true} />

      <div className="profile-layout">
        <div className="avatar-container">
          <h1 className="current-user-name">Pick an avatar</h1>
          <div className="current-avatar">
            <img src={'https://avatars.dicebear.com/api/' + avatar} />
          </div>
          <AvatarReel setAvatar={setAvatar} />
          <button
            className="save-change"
            style={{ marginTop: 15 }}
            onClick={() => {
              const random = getRandomString();
              changeHandler('avatar', random);
            }}
          >
            Random Avatar
          </button>
        </div>

        <form className="input-container">
          <div className="heading-row row">
            <div>
              Hey {user.displayName}, you wanna change your details below?
            </div>
          </div>

          <div className="name-email-row row">
            <div>
              <div>Username</div>
              <input
                className="input-area"
                type="text"
                value={userName}
                onChange={(e) => changeHandler('username', e.target.value)}
              />
            </div>

            <div>
              <div>Email</div>
              <input
                className="input-area"
                type="text"
                value={email}
                onChange={(e) => changeHandler('email', e.target.value)}
              />
            </div>
          </div>

          <div className="pwd-row row">
            <div>
              <div>Password</div>
              <input
                className="input-area"
                type="password"
                value={password}
                onChange={(e) => changeHandler('password', e.target.value)}
              />
            </div>
            <div>
              <div>Confirm Password</div>
              <input
                className="input-area"
                type="password"
                value={passwordVerify}
                onChange={(e) =>
                  changeHandler('verifypassword', e.target.value)
                }
              />
            </div>
          </div>

          <div className="btn-row row">
            <button
              disabled={!buttonActive}
              className="save-change"
              type="submit"
              onClick={(e) => updateUser(e)}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </StyledProfile>
  );
}

export default Profile;
