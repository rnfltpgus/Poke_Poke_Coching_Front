import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleButton } from 'react-google-button';
import axios from 'axios';

import { signInWithGoogle, signOutGoogle, auth } from '../auth/firebase';
import { isLogined } from '../features/userSlice';

import styled from 'styled-components';

const Header = () => {
  const dispatch = useDispatch();
  const email = useSelector((store) => store.userEmail);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          isLogined({
            name: user.displayName,
            email: user.email,
          }),
        );
      } else {
        dispatch(
          isLogined({
            name: null,
            email: null,
          }),
        );
      }
    });
  }, []);

  const name = useSelector((store) => store.userName);

  const myPage = async () => {
    const myPage = await axios.post('http://localhost:8080/myPage', {
      email,
    });
  };

  return (
    <HeaderWrap>
      <div className='header-layout container'>
        <h1>
          <a href='/'>P.P.C.</a>
        </h1>
        <div>
          {name ? (
            <>
              <span className='user-name'>{name} 님</span>
              <span className='bar'>|</span>
              <span href='' className='logout' onClick={signOutGoogle}>
                Sign out
              </span>
              <button className='my-page' onClick={myPage}>
                MyPage
              </button>
            </>
          ) : (
            <GoogleButton
              className='google-login-button'
              onClick={signInWithGoogle}
            />
          )}
        </div>
      </div>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  padding: 25px 0;
  border-bottom: 1px solid #ebebeb;

  h1 a {
    font-weight: bold;
    font-size: 28px;
    margin-left: 10px;
  }

  .header-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .google-login-button {
      margin-right: 10px;
      display: flex;
      align-items: center;
      border-radius: 30px;
      border: 1px solid #d6d3d3;
      background-color: #fff;
    }

    .user-name {
      font-weight: bold;
    }

    .bar {
      margin: 0 15px;
      font-weight: bold;
    }

    .logout {
      cursor: pointer;
      color: #4785f0;
    }

    .my-page {
      margin-left: 20px;
      border-radius: 10px;
      border: none;
      padding: 10px 15px;
      color: #fff;
      background-color: #4485f4;
      margin-right: 10px;
    }
  }
`;
