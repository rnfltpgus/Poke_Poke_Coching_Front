import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundPageWrap>
      <div className='not-found-container'>
        <div className='not-found-title'>NotFoundPage</div>
        <div>페이지를 찾을 수 없습니다.</div>
        <div>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.</div>
        <div>입력하신 주소가 정확한지 다시 한번 확인해주세요.</div>
        <button
          onClick={() => {
            navigate(-1);
          }}>
          이전 페이지
        </button>
        <div className='not-found-con'></div>
        <img src='img/404page.png' alt='404page imgs' />
      </div>
    </NotFoundPageWrap>
  );
};

export default NotFoundPage;

const NotFoundPageWrap = styled.div`
  background-color: #f3ffcc;
  top: 0px;

  .not-found-container {
    position: relative;
    width: 780px;
    /* margin: 7% auto 0; */
    padding: 30px 0 15px;
  }

  .not-found-title {
    margin-bottom: 10px;
  }

  .not-found-container > img {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 400px;
    height: 430px;
    border-radius: 10px;
  }
`;

// block content
//   div.notFound-container
//     a(href="/")
//       img(src="../images/VotingLogo.png", alt="logo")
//     h2 404. Not Found!
//     p= `The requested URL ${path} was not found on this server. That’s all we know.`
//     img(src="../images/404Image.png", alt="404")
