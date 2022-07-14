import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { useRecoilValue } from 'recoil';

import { userState } from '../recoil/atom';
import { signInWithGoogle } from '../auth/firebase';

import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.displayName) {
      navigate('/');
    }
  }, [user.displayName]);

  return (
    <LoginWrap>
      <div className='login-image-container'>
        <img src='/img/Logo.png' alt='logo-imag' />
      </div>
      <GoogleButton onClick={signInWithGoogle} className='google-btn' />
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
  gap: 140px;
  height: 75vh;

  .login-footer {
    position: absolute;
    bottom: 9vh;
    align-items: center;
    font-weight: initial;
  }

  .google-btn {
    cursor: pointer;
    transition: all 300ms ease-in-out;
    transform: translateY(0);
  }

  .google-btn:hover {
    transform: translateY(-3px);
  }
`;
