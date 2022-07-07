import React from 'react';

import TurtleNeck from '../components/TurtleNeck';
import TextCard from '../components/TextCard';

import styled from 'styled-components';

const stretchingMode = () => {
  return (
    <StretchingWrap>
      <div className='stretching-container'>
        <div className='stretchingEx'>
          <span className='stretchingMode-title'>거북목 교정 스트레칭</span>
        </div>
        <div className='stretchingMode'>
          <TurtleNeck />
        </div>
      </div>
      <TextCard />
    </StretchingWrap>
  );
};

export default stretchingMode;

const StretchingWrap = styled.div`
  & div {
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    color: black;
    flex: 1;
    box-sizing: border-box;
    font-weight: bold;
  }

  .stretching-container {
    border-radius: 10px;
    width: 95%;
    margin: 30px auto 10px auto;
    gap: 2rem;
    display: flex;
  }

  .stretchingEx {
    background-image: url('img/stretchingMode.gif');
    background-size: cover;
    height: 700px;
  }

  .stretchingMode {
    height: 700px;
  }

  .stretchingMode-title {
    float: left;
    background-color: #87ecfa;
    margin-top: 10px;
    margin-left: 10px;
    padding: 0 10px;
    border-radius: 10px;
  }
`;
