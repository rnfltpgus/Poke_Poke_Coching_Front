import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

let timer;

const CountDownTimer = () => {
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [timerTime, setTimerTime] = useState(0);

  const handleSetTimer = (input) => {
    const max = 216000000;

    if (!timerOn) {
      if (input === 'incHours' && timerTime + 3600000 < max) {
        setTimerTime(timerTime + 3600000);
      } else if (input === 'decHours' && timerTime - 3600000 >= 0) {
        setTimerTime(timerTime - 3600000);
      } else if (input === 'incMinutes' && timerTime + 60000 < max) {
        setTimerTime(timerTime + 60000);
      } else if (input === 'decMinutes' && timerTime - 60000 >= 0) {
        setTimerTime(timerTime - 60000);
      } else if (input === 'incSeconds' && timerTime + 1000 < max) {
        setTimerTime(timerTime + 1000);
      } else if (input === 'decSeconds' && timerTime - 1000 >= 0) {
        setTimerTime(timerTime - 1000);
      } else if (input === 'incMSeconds' && timerTime + 10 < max) {
        setTimerTime(timerTime + 10);
      } else if (input === 'decMSeconds' && timerTime - 10 >= 0) {
        setTimerTime(timerTime - 10);
      }
    }
  };

  const StartTimer = () => {
    setTimerOn(false);
    setTimerStart(timerTime);
    setTimerTime(timerTime);

    useEffect(() => {
      let timer = null;

      timer = setInterval(() => {
        const newTime = timerTime - 10;
        if (newTime >= 0) {
          setTimerTime(newTime);
        } else {
          clearInterval(timer);
          setTimerOn(false);
          setTimerStart(0);
          setTimerTime(0);
        }
      }, 10);
    }, []);
  };

  const pauseTimer = () => {
    clearInterval(timer);
    setTimerOn(false);
  };

  const stopTimer = () => {
    setTimerOn(false);
    setTimerStart(0);
    setTimerTime(0);
    clearInterval(timer);
  };

  useEffect(() => {
    if (localStorage.getItem('timerStart') !== null) {
      let previousState = JSON.parse(localStorage.getItem('timerStart'));
      if (previousState.timerStart > 0) {
        reStartTimer();
      }
    }

    const reStartTimer = () => {
      if (localStorage.getItem('timerStart') !== null) {
        let previousState = JSON.parse(localStorage.getItem('timerStart'));
        setTimerOn(true);
        setTimerStart(previousState.timerStart);
        setTimerTime(previousState.timerTime);
      }

      timer = setInterval(() => {
        const newTime = timerTime - 10;
        if (newTime >= 0) {
          setTimerTime(newTime);
        } else {
          clearInterval(timer);
          setTimerTime(false);
        }
      }, 10);
    };

    const handleTabClose = () => {
      localStorage.setItem('timerStart', JSON.stringify(timerStart));
    };
    return () => {
      document.addEventListener('keydown', false);
      window.addEventListener('beforeunload', handleTabClose);
    };
  }, [timerStart, timerTime]);

  let hours = ('0' + Math.floor((timerTime / 3600000) % 60)).slice(-2);
  let minutes = ('0' + Math.floor((timerTime / 60000) % 60)).slice(-2);
  let seconds = ('0' + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);

  return (
    <CountDownTimerWrap className='countdown'>
      <div className='countdown-header'>Countdown Timer</div>
      <div className='countdown-display'>
        <div className='countdown-item'>
          <div>
            <button
              className='increase-btn'
              onClick={() => handleSetTimer('incHours')}></button>
          </div>
          <div className='countdown-time'>{hours} 시</div>
          <div>
            <button
              className='decrease-btn'
              onClick={() => handleSetTimer('decHours')}></button>
          </div>
        </div>
        <div className='countdown-item'>
          <div>
            <button
              className='increase-btn'
              onClick={() => handleSetTimer('incMinutes')}></button>
          </div>
          <div className='countdown-time'>{minutes} 분</div>
          <div>
            <button
              className='decrease-btn'
              onClick={() => handleSetTimer('decMinutes')}></button>
          </div>
        </div>
        <div className='countdown-item'>
          <div>
            <button
              className='increase-btn'
              onClick={() => handleSetTimer('incSeconds')}></button>
          </div>
          <div className='countdown-time'>{seconds} 초</div>
          <div>
            <button
              className='decrease-btn'
              onClick={() => handleSetTimer('decSeconds')}></button>
          </div>
        </div>
      </div>

      <div className='action-btn'>
        {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
          <button
            className='start-btn'
            onClick={StartTimer}
            disabled={timerTime === 0}>
            Start
          </button>
        )}

        {timerOn === true && timerTime >= 1000 && (
          <button className='pause-btn' onClick={pauseTimer}>
            Pause
          </button>
        )}

        {timerOn === false &&
          timerStart !== 0 &&
          timerStart !== timerTime &&
          timerTime !== 0 && (
            <button className='resume-btn' onClick={StartTimer}>
              Resume
            </button>
          )}

        {timerOn === true && (
          <button className='stop-btn' onClick={stopTimer}>
            Stop
          </button>
        )}
      </div>
    </CountDownTimerWrap>
  );
};

export default CountDownTimer;

const CountDownTimerWrap = styled.div`
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
    border-radius: 10px;
    width: 95%;
    margin: 10px auto;
    gap: 2rem;
    display: flex;
  }

  .increase-btn {
    width: 20px;
    height: 20px;
    border-radius: 50px 50% 50% 5px;
    border: saddlebrown;
    background-color: #f898ff;
  }

  .decrease-btn {
    width: 20px;
    height: 20px;
    border-radius: 5px 5px 50px 50%;
    border: saddlebrown;
    background-color: #ffafbd;
  }

  .pause-btn {
    margin-right: 10px;
  }

  .countdown-time {
    font-size: 18px;
  }
`;
