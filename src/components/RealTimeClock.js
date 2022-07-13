import React, { useState, useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { conditionState } from '../recoil/atom';
import padNumber from '../util/helpers/padNumber';

import styled from 'styled-components';

const RealTimeClock = () => {
  let now = new Date();
  const [hour, setHour] = useState(padNumber(now.getHours(), 2));
  const [min, setMin] = useState(padNumber(now.getMinutes(), 2));
  const [sec, setSec] = useState(padNumber(now.getSeconds(), 2));
  const [time, setTime] = useState(0);
  const currentCondition = useRecoilValue(conditionState);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      now = new Date();
      setHour(padNumber(now.getHours(), 2));
      setMin(padNumber(now.getMinutes(), 2));
      setSec(padNumber(now.getSeconds(), 2));
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    let interval = null;

    if (currentCondition.studyModeOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentCondition.studyModeOn]);

  return (
    <RealTimeClockWrap>
      <div>
        <div className='realtime-header'>Real Time</div>
        <div className='realtime'>
          {hour}시 {min}분 {sec}초
        </div>
      </div>
      <div>
        <div className='realtime-study-header'>Real Study Time</div>
        <div className='realtime'>{currentCondition.studyModeOn}</div>
        <div className='stopwatch-display'>
          <span>{('0' + Math.floor((time / 3600000) % 60)).slice(-2)}시 </span>
          <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}분 </span>
          <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}초 </span>
        </div>
      </div>
    </RealTimeClockWrap>
  );
};

export default RealTimeClock;

const RealTimeClockWrap = styled.div`
  display: flex;
  width: 95%;
  margin: 40px auto 10px auto;

  .realtime-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }

  .realtime-study-header {
    background-color: #b568f3;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }

  .realtime {
    font-size: 17px;
  }
`;
