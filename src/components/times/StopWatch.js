import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <StopWatchWrap>
      <div className='stopwatch-header'>Stopwatch</div>
      <div className='stopwatch-display'>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div className='stopwatch-buttons'>
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && (
          <button className='stop-btn' onClick={() => setTimerOn(false)}>
            Stop
          </button>
        )}
        {!timerOn && time > 0 && (
          <button className='reset-btn' onClick={() => setTime(0)}>
            Reset
          </button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
      </div>
    </StopWatchWrap>
  );
};

export default StopWatch;

const StopWatchWrap = styled.div`
  width: 95%;
  margin: 4vh auto 1vw auto;
  gap: 2rem;

  .stopwatch-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 1.5rem;
  }

  .stopwatch-display {
    margin: 1rem 1rem auto;
    font-size: 1.5rem;
  }

  & button {
    border-radius: 10px;
    border: none;
    background-color: #4785f0;
    color: #fff;
    font-weight: bold;
    width: 8vw;
    height: 3vh;
    margin-top: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    transform: translateY(0);
  }

  & button:hover {
    transform: translateY(-3px);
  }

  .reset-btn {
    background-color: #ffafbd;
    color: black;
    margin-right: 1rem;
  }

  .stop-btn {
    background-color: rgb(255, 100, 100);
    color: #fff;
  }
`;
