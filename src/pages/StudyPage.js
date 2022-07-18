import React from 'react';

import StudyMode from '../components/study/StudyMode';
import RealTimeClock from '../components/times/RealTimeClock';
import CountDownTimer from '../components/times/CountDownTimer';
import StopWatch from '../components/times/StopWatch';
import CheckWrongPosture from '../components/study/CheckWrongPosture';

import styled from 'styled-components';

const studyPage = () => {
  return (
    <StudyWrap>
      <div className='stretching-container'>
        <div className='webcam-view'>
          <StudyMode />
        </div>
        <div className='function-mode'>
          <RealTimeClock />
          <CountDownTimer />
          <StopWatch />
          <CheckWrongPosture />
        </div>
      </div>
    </StudyWrap>
  );
};

export default studyPage;

const StudyWrap = styled.div`
  & div {
    line-height: 5vh;
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

  .webcam-view {
    background-color: #faf5d5;
    height: 87vh;
  }

  .function-mode {
    background-color: #d4d1ff;
    height: 87vh;
  }
`;
