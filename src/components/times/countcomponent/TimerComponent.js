import React, { useState, useEffect } from 'react';

import Modal from '../../modal/Modal';
import TimerShutdownNotice from './TimerShutdownNotice';

import styled from 'styled-components';

let interval = 0;

const TimerComponent = (props) => {
  const { timerData } = props;
  const [countdownTime, setCountdownTime] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let expectedTime = new Date().getTime();
    let { hours, minutes, seconds } = timerData;

    expectedTime += hours > 0 ? hours * 3600000 : 0;
    expectedTime += minutes > 0 ? minutes * 60000 : 0;
    expectedTime += seconds > 0 ? seconds * 1000 : 0;

    setCountdownTime(expectedTime);

    return () => {
      expectedTime = 0;
    };
  }, [timerData]);

  useEffect(() => {
    if (countdownTime > new Date().getTime()) {
      interval = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }

    if (
      timeLeft.hours === '00' &&
      timeLeft.minutes === '00' &&
      timeLeft.seconds === '00'
    ) {
      setModalOn(true);
      interval = setTimeout(() => {
        if (modalOn === false) {
          props.setTimerRunning();
        }
      }, 5000);
    }

    return () => {
      clearTimeout(interval);
    };
  }, [countdownTime, props, timeLeft.seconds]);

  const calculateTimeLeft = () => {
    let currantTime = new Date().getTime();
    let difference = countdownTime - currantTime;
    let timeDiff = {
      hours:
        difference > 0 ? Math.floor((difference / (1000 * 60 * 60)) % 24) : 0,
      minutes: difference > 0 ? Math.floor((difference / 1000 / 60) % 60) : 0,
      seconds: difference > 0 ? Math.floor((difference / 1000) % 60) : 0,
    };

    timeDiff.hours =
      timeDiff.hours < 10 ? `0${timeDiff.hours}` : `${timeDiff.hours}`;
    timeDiff.minutes =
      timeDiff.minutes < 10 ? `0${timeDiff.minutes}` : `${timeDiff.minutes}`;
    timeDiff.seconds =
      timeDiff.seconds < 10 ? `0${timeDiff.seconds}` : `${timeDiff.seconds}`;

    return timeDiff;
  };

  const stopTimer = () => {
    if (interval > 0) {
      clearTimeout(interval);
    }

    props.stopCountdown();
  };

  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <TimerComponentWrap>
      <div className='countdown-header'>Countdown Timer</div>
      <div className='countdown-display'>
        <div className='countdown-item'>
          <span>시</span>
          <div className='countdown-time'>{timeLeft.hours}</div>
        </div>
        <div className='countdown-item'>
          <span>분</span>
          <div className='countdown-time'>{timeLeft.minutes}</div>
        </div>
        <div className='countdown-item'>
          <span>초</span>
          <div className='countdown-time'>{timeLeft.seconds}</div>
        </div>
      </div>
      <div id='stop-btn'>
        <div onClick={stopTimer}>
          <button>Stop</button>
        </div>
      </div>
      {modalOn && (
        <Modal
          visible={modalOn}
          closable={true}
          backGroundClosable={true}
          onClose={closeModal}
          backGroundColor={'rgb(82, 206, 255, 0.6)'}>
          <TimerShutdownNotice />
        </Modal>
      )}
    </TimerComponentWrap>
  );
};

export default TimerComponent;

const TimerComponentWrap = styled.div`
  width: 95%;
  margin: 30px auto 10px auto;
  gap: 2rem;

  .countdown-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
  }

  .countdown-display {
    width: 95%;
    margin: 25px auto 24px auto;
    display: flex;
  }

  .countdown-time {
    margin-top: 10px;
    font-size: 30px;
  }

  span {
    font-size: 20px;
  }
`;
