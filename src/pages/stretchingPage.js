import React from 'react';

import TurtleNeckStretching from '../components/stretching/TurtleNeckStretching';
import ArmStretching from '../components/stretching/ArmStretching';
import TextCard from '../components/stretching/TextCard';

import styled from 'styled-components';

const StretchingPage = () => {
  return (
    <StretchingWrap>
      <div className='stretching-container'>
        <div className='stretching-ex'>
          <span className='stretching-mode-title'>거북목 교정 스트레칭</span>
        </div>
        <div className='stretching-mode'>
          <TurtleNeckStretching />
          <ArmStretching />
        </div>
      </div>
      <TextCard />
    </StretchingWrap>
  );
};

export default StretchingPage;

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

  .stretching-ex {
    background-image: url('img/stretchingMode.gif');
    background-size: cover;
    height: 700px;
  }

  .stretching-mode {
    height: 700px;
  }

  .stretching-mode-title {
    float: left;
    background-color: #d4d1ff;
    margin-top: 10px;
    margin-left: 10px;
    padding: 0 10px;
    border-radius: 10px;
  }
`;
