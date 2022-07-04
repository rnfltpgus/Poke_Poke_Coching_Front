import React from 'react';

import Camera from '../components/Camera';

import styled from 'styled-components';

const stretchingMode = () => {
  return (
    <StretchingWrap>
      <div className='stretchingEx'>
        <span>거북목 교정 스트레칭</span>
      </div>
      <div className='stretchingMode'>
        <Camera className='stretchingMode' />
      </div>
    </StretchingWrap>
  );
};

export default stretchingMode;

const StretchingWrap = styled.div`
  display: flex;
  width: 95%;
  margin: 30px auto;
  gap: 2rem;

  & div {
    padding: 10px;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    color: black;
    flex: 1;
    height: 600px;
    box-sizing: border-box;
    font-weight: bold;
  }

  & span {
    float: left;
    background-color: #87ecfa;
    padding: 0 10px;
    border-radius: 10px;
  }

  .stretchingEx {
    background-image: url('img/stretchingMode.gif');
    background-size: cover;
  }

  .stretchingMode {
    background-color: bisque;
    background-size: cover;
  }
`;
