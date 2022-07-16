import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundPageWrap>
      <div className='not-found-container'>
        <div className='not-found-title'>Not Found Page</div>
        <div>페이지를 찾을 수 없습니다.</div>
        <div>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.</div>
        <div>입력하신 주소가 정확한지 다시 한번 확인해주세요.</div>
        <button
          onClick={() => {
            navigate(-1);
          }}>
          이전 페이지
        </button>
        <img src='img/404page.png' alt='404page imgs' />
      </div>
    </NotFoundPageWrap>
  );
};

export default NotFoundPage;

const NotFoundPageWrap = styled.div`
  background-color: #f3ffcc;
  height: 100vh;
  position: relative;

  .not-found-container {
    position: absolute;
    width: 840px;
    left: 26%;
    top: 22%;
    padding: 30px 0 15px;
  }

  .not-found-title {
    margin-top: 40px;
    font-weight: bold;
    font-size: 40px;
  }

  .not-found-container > div {
    margin-bottom: 40px;
  }

  .not-found-container > img {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 370px;
    height: 370px;
    border-radius: 10px;
    margin-top: 15px;
  }

  .not-found-container > button {
    background-color: #4485f4;
    font-size: 17px;
    font-weight: bold;
    border: none;
    color: #ffffff;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    transform: translateY(0);
    border-radius: 5px;
    height: 40px;
    width: 120px;
  }

  .not-found-container > button:hover {
    transform: translateY(-3px);
  }
`;
