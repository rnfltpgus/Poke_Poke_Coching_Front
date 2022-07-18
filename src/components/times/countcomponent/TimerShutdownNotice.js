import React from 'react';

import styled from 'styled-components';

const TimerShutdownNotice = () => {
  return (
    <TimerShutdownNoticeWrap>
      <div className='timer-shutdown-title'>⏰ TimerShutdownNotice</div>
      <div className='timer-shutdown-description'>
        설정하신 타이머가 완료되었습니다 !!
      </div>
    </TimerShutdownNoticeWrap>
  );
};

export default TimerShutdownNotice;

const TimerShutdownNoticeWrap = styled.div`
  .timer-shutdown-title {
    margin: 2rem;
    font-size: 2rem;
    font-weight: bold;
    justify-content: center;
    text-align: center;
  }

  .timer-shutdown-description {
    margin-top: 5rem;
    padding: 2rem;
    font-size: 1.5rem;
    justify-content: center;
    text-align: center;
  }
`;
