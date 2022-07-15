import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { userState } from '../recoil/atom';
import { signOutGoogle, auth } from '../auth/firebase';
import GuideLines from './GuideLines';
import Modal from './modal/Modal';

import styled from 'styled-components';

const Header = () => {
  const isLogins = useSetRecoilState(userState);
  const user = useRecoilValue(userState);
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        isLogins({
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        isLogins({
          displayName: null,
          email: null,
        });
      }
    });
  }, []);

  const openModal = () => {
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <HeaderWrap>
      <div className='header-layout container'>
        <h1>
          <a href='/'>P.P.C.</a>
        </h1>
        <div>
          {user.displayName ? (
            <>
              <span className='user-name'>{user.displayName} 님</span>
              <span className='bar'>|</span>
              <span href='' className='logout' onClick={signOutGoogle}>
                Sign out
              </span>
              <button className='guide-lines' onClick={openModal}>
                Guide Lines
              </button>
              {modalOn && (
                <Modal
                  visible={modalOn}
                  closable={true}
                  backGroundClosable={true}
                  onClose={closeModal}>
                  <GuideLines />
                </Modal>
              )}
            </>
          ) : (
            <Link to='/login'>
              <button className='login'>Login</button>
            </Link>
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
    margin-left: 25px;
    font-weight: bold;
    font-size: 28px;
  }

  .header-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .login {
      padding: 10px 20px;
      margin-right: 25px;
      display: flex;
      align-items: center;
      border-radius: 10px;
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

    .guide-lines {
      margin-left: 25px;
      margin-right: 25px;
      border-radius: 10px;
      border: none;
      padding: 10px 15px;
      color: #fff;
      background-color: #4485f4;
    }
  }
`;
