import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import StyledSplash from './Splash.styled';

function Splash() {
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>(
    'login'
  );

  return (
    <StyledSplash>
      {loginOrRegister === 'login' ? (
        <Login setLoginOrRegister={setLoginOrRegister} />
      ) : (
        <Register setLoginOrRegister={setLoginOrRegister} />
      )}
    </StyledSplash>
  );
}

export default Splash;
