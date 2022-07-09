import React, { useState, useRef, useEffect } from 'react';

import padNumber from '../util/helpers/padNumber';

import styled from 'styled-components';

const RealTimeClock = () => {
  let now = new Date();
  const [hour, setHour] = useState(padNumber(now.getHours(), 2));
  const [min, setMin] = useState(padNumber(now.getMinutes(), 2));
  const [sec, setSec] = useState(padNumber(now.getSeconds(), 2));
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

  return (
    <RealTimeClockWrap>
      <div className='realtime-header'>Real Time</div>
      <div className='realtime'>
        {hour}시 {min}분 {sec}초
      </div>
    </RealTimeClockWrap>
  );
};

export default RealTimeClock;

const RealTimeClockWrap = styled.div`
  width: 95%;
  margin: 30px auto 10px auto;
  gap: 2rem;

  .realtime-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }

  .realtime {
    font-size: 17px;
  }
`;
