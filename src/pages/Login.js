import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';

import userState from '../recoil/user';

import { useRecoilValue } from 'recoil';

import { signInWithGoogle } from '../auth/firebase';

import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const name = useRecoilValue(userState);

  useEffect(() => {
    if (name.displayName) {
      navigate('/');
    }
  }, [name.displayName]);

  return (
    <LoginWrap>
      <div className='login-image-container'>
        <img src='/img/Logo.png' />
      </div>
      <GoogleButton onClick={signInWithGoogle} />
      <div className='login-footer'>
        <span>© 2022 Reserved by Seny</span>
      </div>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  height: 60vh;

  .login-footer {
    position: absolute;
    bottom: 5vh;
    align-items: center;
  }
`;
