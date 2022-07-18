import React, { useState } from 'react';

import styled from 'styled-components';

const InputComponent = (props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const startTimer = () => {
    props.startCountdown({
      hours,
      minutes,
      seconds,
    });
  };

  const handleSetTimer = (input) => {
    const max = 60;

    if (input === 'incHours' && hours + 1 < 24) {
      setHours(hours + 1);
    } else if (input === 'decHours' && hours - 1 >= 0) {
      setHours(hours - 1);
    } else if (input === 'incMinutes' && minutes + 1 < max) {
      setMinutes(minutes + 1);
    } else if (input === 'decMinutes' && minutes - 1 >= 0) {
      setMinutes(minutes - 1);
    } else if (input === 'incSeconds' && seconds + 1 < max) {
      setSeconds(seconds + 1);
    } else if (input === 'decSeconds' && seconds - 1 >= 0) {
      setSeconds(seconds - 1);
    }
  };

  return (
    <InputComponentWrap>
      <div className='countdown-header'>Countdown Timer</div>
      <div>
        <div className='countdown-display'>
          <div className='countdown-item'>
            <button
              className='increase-btn'
              onClick={() => handleSetTimer('incHours')}></button>
            <div className='countdown-time'>{hours} 시</div>
            <button
              className='decrease-btn'
              onClick={() => handleSetTimer('decHours')}></button>
          </div>
          <div className='countdown-item'>
            <button
              className='increase-btn'
              onClick={() => handleSetTimer('incMinutes')}></button>
            <div className='countdown-time'>{minutes} 분</div>
            <button
              className='decrease-btn'
              onClick={() => handleSetTimer('decMinutes')}></button>
          </div>
          <div className='countdown-item'>
            <button
              className='increase-btn'
              onClick={() => handleSetTimer('incSeconds')}></button>
            <div className='countdown-time'>{seconds} 초</div>
            <button
              className='decrease-btn'
              onClick={() => handleSetTimer('decSeconds')}></button>
          </div>
        </div>
        <button
          onClick={startTimer}
          disabled={seconds === 0 && minutes === 0 && hours === 0}
          style={
            seconds === 0 && minutes === 0 && hours === 0
              ? { opacity: '0.5' }
              : {}
          }>
          Start
        </button>
      </div>
    </InputComponentWrap>
  );
};

export default InputComponent;

const InputComponentWrap = styled.div`
  width: 95%;
  margin: 4vh auto 1vw auto;
  gap: 2rem;

  .countdown-header {
    background-color: #948df9;
    margin: 10px 30px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 1.5rem;
  }

  .countdown-display {
    border-radius: 10px;
    width: 95%;
    margin: 2rem 1rem auto;
    display: flex;
  }

  .increase-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 5rem 50% 50% 1rem;
    border: saddlebrown;
    background-color: #f898ff;
  }

  .decrease-btn {
    margin: 0 auto;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem 1rem 5rem 50%;
    border: saddlebrown;
    background-color: #ffafbd;
  }

  .countdown-time {
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
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 300ms ease-in-out;
    transform: translateY(0);

    :hover {
      transform: translateY(-3px);
    }
  }
`;
